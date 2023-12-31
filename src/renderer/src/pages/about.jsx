function About() {

    const handleLink = (e) => {
        e.preventDefault();
        window.api.openLinkInChrome("https://discord.gg/qUAWxapD8X")
    }
    const handleLinkGit = (e) => {
        e.preventDefault();
        window.api.openLinkInChrome("https://github.com/MrMiM-tfe/ats-movie")
    }

    return (
        <div className="about">
            <h1>
                درباره این برنامه
            </h1>
            <p>
                این یک برنامه رایگان تماشای و دانلود فیلم است که به شکل رایگان در دسترس شما قرار دارد.
            </p>
            <p>
                این برنامه توسط تیم برنامه نویسی ATS توسعه پیدا کرده
            </p>
            <br />
            <p>
                سرور دیسکورد ما : <a href="https://discord.gg/qUAWxapD8X" onClick={handleLink}>https://discord.gg/qUAWxapD8X</a>
            </p>
            <p>
                لینک گیت هاب : <a href="https://github.com/MrMiM-tfe/ats-movie" onClick={handleLinkGit}>https://github.com/MrMiM-tfe/ats-movie</a>
            </p>
        </div>
    )
}

export default About