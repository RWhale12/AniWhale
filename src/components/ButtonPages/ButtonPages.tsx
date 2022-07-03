import { useAppSelector } from '../../redux/hooks';
import './ButtonPages.scss'

type ButtonPagesProps ={
    page: number;
    updatePage: (value: number) => void;
    top?: boolean;
    new?: boolean;
}

export const ButtonPages = (props: ButtonPagesProps) => {
    let selectorPages = useAppSelector(state => state.cardSliceReduser.countPages);
    if(props.top) selectorPages = 4;
    if(props.new) selectorPages = 10;

    function createMassPages() {
        const array = [];
        if (selectorPages) {
            if(selectorPages <= 11){
                for (let i = 0; i <= selectorPages-1; i++)
                    array.push(i + 1);
            }else if (props.page <= 5) {
                for (let i = 0; i <= 10; i++)
                    array.push(i + 1);
                array.push('...')
                array.push(selectorPages)
            } else if (props.page >= 4 && selectorPages - props.page > 6) {
                array.push(1);
                array.push('...')
                for (let i = props.page - 4; i <= props.page + 4; i++)
                    array.push(i + 1);
                array.push('...')
                array.push(selectorPages);
            }
            else if (selectorPages - props.page <= 6) {
                array.push(1);
                array.push('...')
                for (let i = selectorPages - 11; i <= selectorPages - 1; i++) {
                    array.push(i + 1);
                }
            }

        }
        return array;
    }
    return(
        <div className='animes--pages-buttons'>
            {selectorPages && createMassPages().map(pageAnime => {
                    if (props.page === pageAnime)
                        return <div className="animes--number-page-active animes--number-page">{pageAnime}</div>
                    if (typeof pageAnime === 'string') {
                        return <div className="animes--number-page">{pageAnime}</div>
                    } else
                        return <div className="animes--number-page" onClick={() => props.updatePage(pageAnime)}>{pageAnime}</div>
                })}
        </div>
    )
}