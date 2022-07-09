import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import './PageAccount.scss'
import { Account } from '../../components/Header/Header'
import { setDoc, collection, getFirestore, query, doc, getDoc, getDocs } from "firebase/firestore";
import { Loader } from '../../components/Loader';
import { AnimeCard } from '../../components/AnimeCard';
import { Card } from '../../redux/slices/cardSlice';


type AccountInfoDB = {
    gender?: string;
    nickname?: string;
    country?: string;
    birthday?: string;
}

export const PageAccount = () => {
    const db = getFirestore();
    const auth = getAuth();
    const [shortInfoAccount, setShortInfoAccount] = useState<Account>();
    const [longInfoAccount, setLongInfoAccount] = useState<AccountInfoDB>();
    const [myList, setMyList] = useState<Array<Card>>();
    const [gender, setGender] = useState<string>();
    const countries = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cura?ao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'R?union', 'Romania', 'Russia', 'Rwanda', 'Saint Barth?lemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'S?o Tom? and Pr?ncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];

    async function reading() {
        let info: any = {};
        await getDoc(doc(db, "users", `${auth.currentUser?.uid}`)).then((item) => {
            if (item.exists()) {
                info = item.data();
            } else {
                info = reading();
            }
        })
        return info;
    }

    async function readingMyList() {
        let arrayAnimeProps: any = [];
        await getDocs(query(collection(db, `mylist-${auth.currentUser?.uid}`))).then((item) => {
            if (item.size) {
                item.forEach((doc) => {
                    arrayAnimeProps.push(doc.data());
                    console.log(doc.data())
                })
            } 
            else {
                arrayAnimeProps = readingMyList();
            }

        })
        return arrayAnimeProps;
    }

    useEffect(() => {
        if (longInfoAccount) {
            setGender(longInfoAccount.gender);
            if (longInfoAccount.nickname)
                (document.querySelector('.create-account-info--nickname') as HTMLInputElement).value = longInfoAccount.nickname;
            if (longInfoAccount.birthday)
                (document.querySelector('.create-account-info--birthday') as HTMLInputElement).value = longInfoAccount.birthday;
            if (longInfoAccount.country)
                (document.querySelector('.create-account-info--country') as HTMLInputElement).value = longInfoAccount.country;
        }
    }, [longInfoAccount])

    useEffect(() => {
        reading().then((item) => { setLongInfoAccount(item) });
        readingMyList().then((item) => { setMyList(item); console.log(item) })
        onAuthStateChanged(auth, (user) => {
            if (user)
                setShortInfoAccount({
                    verify: user.emailVerified,
                    username: user.displayName,
                    email: user.email,
                    verified: user.emailVerified,
                })
        });
    }, []);


    async function UpdateInfoAccount() {
        const docRef = await setDoc(doc(db, `users`, `${auth.currentUser?.uid}`), {
            nickname: (document.querySelector('.create-account-info--nickname') as HTMLInputElement).value,
            country: (document.querySelector('.create-account-info--country') as HTMLSelectElement).value,
            gender: gender,
            birthday: (document.querySelector('.create-account-info--birthday') as HTMLInputElement).value,
        });
        window.location.assign('/account')
    }

    return (
        <div className='App-children'>
            <div className='account-info'>
                {!shortInfoAccount && <Loader />}
                {shortInfoAccount && shortInfoAccount.username &&
                    <div className='account-info--avatar'>
                        <div className='account-info--avatar-img'>{(shortInfoAccount.username)[0]}</div>
                    </div>}
                {shortInfoAccount &&
                    <div className='account-info--text'>

                        {shortInfoAccount.username && <label htmlFor="">Name: {shortInfoAccount.username}</label>}
                        {longInfoAccount?.nickname && <label htmlFor="">Nickname: {longInfoAccount.nickname}</label>}
                        {shortInfoAccount.email && <label htmlFor="">Email: {shortInfoAccount.email}</label>}
                        {longInfoAccount?.gender && <label htmlFor="">Gender: {longInfoAccount.gender}</label>}
                        {longInfoAccount?.country && <label htmlFor="">Country: {longInfoAccount.country}</label>}
                        {longInfoAccount?.birthday && <label htmlFor="">Birthday: {longInfoAccount.birthday}</label>}
                        {!longInfoAccount && <Loader />}
                    </div>}
                <div className='account-info--update'>
                    {shortInfoAccount?.verified && <label className='verify-true verify'>verify</label>}
                    {!shortInfoAccount?.verified && <label className='verify-false verify'>noverify</label>}
                    <button onClick={() => (document.querySelector('.create-account-info') as HTMLDivElement).style.display = 'flex'}>update</button>
                </div>

            </div>
            <div className='create-account-info'>
                <div>Nickname:<input type="textfield" className='create-account-info--nickname' placeholder={longInfoAccount && longInfoAccount.nickname}></input></div>
                <div>Gender:
                    <input type='radio' name='gender' value='Female' onClick={() => setGender('Female')} className='create-account-info--gender-Female' checked={gender === 'Female'} />
                    <label>Female</label>
                    <input type='radio' name='gender' value='Male' onClick={() => setGender('Male')} className='create-account-info--gender-Male' checked={gender === 'Male'}>
                    </input>
                    <label>Male</label>
                </div>
                <div>Counry:
                    <select className='create-account-info--country'>
                        {countries &&
                            countries.map((item) => {
                                return <option>{item}</option>
                            })
                        }
                    </select>
                </div>
                <div>Bitrhday:<input type="date" className='create-account-info--birthday' /></div>
                <button onClick={() => UpdateInfoAccount()}>update</button><button onClick={() => (document.querySelector('.create-account-info') as HTMLDivElement).style.display = 'none'}>close</button>

            </div>
            <div className='account-info--mylist animes'>
                <label htmlFor="" className='mylist-tittle'>My list:</label>
                {myList && myList.length > 0 && <div className='animes-div'>
                    {myList.map(el => {
                        return <AnimeCard name={el.name} id={el.id} image={el.image} score={el.score} genres={el.genres} year={el.realeseYear} rating={el.rating} />
                    })}
                </div>}
            </div>

        </div>
    )
}