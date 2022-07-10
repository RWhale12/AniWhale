import './Episode.scss'

type EpisodeProps ={
    id: number;
    title: string;
    jTitle: string;
    url: string;
}

export const Episode = (props:EpisodeProps) => {
    return(
        <div className='episode' onClick={() => window.location.assign(props.url)}>
            <label className='episode-number'>Episode {props.id}</label>
            <label className='episode-name'>{props.title}</label>
            <label className='episode-name-j'>{props.jTitle}</label>
        </div>
    )
}