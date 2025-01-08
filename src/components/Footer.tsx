import './styles.css'
import logo from '../assets/BB_HEARTS_LOGO.png';

function Footer() {

    const socialMedias = [
        {platform: "Instagram", icon: "fa-brands fa-instagram", link: "https://www.instagram.com/beachbunnymusic/"},
        {platform: "Facebook", icon: "fa-brands fa-square-facebook", link: "https://www.facebook.com/beachbunnymusic/"},
        {platform: "YouTube", icon: "fa-brands fa-square-youtube", link: "https://www.youtube.com/channel/UCvyz2XB3Seq9MCbtORt1WIw/featured"},
        {platform: "Spotify", icon: "fa-brands fa-spotify", link: "https://open.spotify.com/intl-fr/artist/2vnB6tuQMaQpORiRdvXF9H"},
        {platform: "SmartUrl", icon: "fa-sharp fa-solid fa-music", link: "https://smarturl.it/BeachBunnyApple"},
        {platform: "bandcamp", icon: "fa-brands fa-bandcamp", link: "https://beachbunny.bandcamp.com/"},
    ]

    return (
        <footer>
            <ul>
                {
                    socialMedias.map((media, index) => {
                        return (
                            <>
                                {
                                    index === 3 &&
                                    <img src={logo} alt=""/>
                                }
                                <li>
                                    <a href={media.link}>
                                        <i className={media.icon}></i>
                                    </a>
                                </li>
                            </>
                        )
                    })
                }
            </ul>
        </footer>
    )
}

export default Footer
