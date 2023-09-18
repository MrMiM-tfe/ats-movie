import { useNavigate} from "react-router-dom"
import { useData } from "../contexts/data"
import { useEffect, useRef, useState } from "react"
import useHorizontalScroll from "../hooks/useHorizontalScroll"
import useSerie from "../hooks/useSerie";
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import useComment from "../hooks/useComment";

function VideoPlayer({url, ref}) {
    const videoRef = useRef(null);

    useEffect(() => {
        // Play the video when the component mounts
        videoRef.current.play();
    }, []);

    return (
        <div className="video-player" ref={ref} onClick={(e) => {if (e.target === e.currentTarget ) {e.target.style.display = "none"; videoRef.current.pause();}}}>
            <div className="video-player-cart">
                <video className="video" src={url} controls ref={videoRef}  />
            </div>
        </div>
    )
}

function PlaySection({sources, ref}) {

    const [url, setUrl] = useState(null)

    const videoPlayerRef = useRef(null);
    const toast = useRef(null);

    const handleCopy = (link) => {
        navigator.clipboard.writeText(link)
        toast.current.show({ severity: 'success', summary: 'Copied', detail: 'URL Copied' });
    };

    const handlePlay = (url) => {
        setUrl(url)

        if (videoPlayerRef.current) {
            videoPlayerRef.current.style.display = "flex";
        }
    }

    return (
        <div className="play-section" ref={ref} onClick={(e) => {if (e.target === e.currentTarget ) {e.target.style.display = "none"}}}>
            <div className="play-cart">
                {sources && sources.map(source => (
                    <div className="source grid" key={source.id}>
                        <div className="source-play col-1">
                            <button onClick={e => handlePlay(source.url)}><i className="pi pi-play" /></button>
                        </div>
                        <div className="quality col">
                            <div>
                                {source.quality}
                            </div>
                        </div>
                        <div className="link col-1">
                            <button onClick={() => handleCopy(source.url)}>
                                Copy link
                            </button>
                        </div>
                        <div className="type col-1">
                            <div>
                                {source.type}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {VideoPlayer({url, ref: videoPlayerRef})}
            <Toast ref={toast} />
        </div>
    )
}

function SingleMovie() {

    const navigate = useNavigate()
    const scrollRef = useHorizontalScroll()
    const playSectionRef = useRef(null)

    const [isExpanded, setIsExpanded] = useState(false);
    const [seasonId, setSeasonId] = useState(null);
    const [season, setSeason] = useState(null);
    const [sources, setSources] = useState(null);
    

    const {getSeasons, Seasons} = useSerie()
    const {getComments, Comments, pending} = useComment()
    const { selectedMovie } = useData()

    useEffect(() => {
        if(!selectedMovie) {
            navigate("/")
            return
        }

        
        if (selectedMovie?.type === "serie") getSeasons(selectedMovie.id)
    },[])

    const loadComments = () => {
        getComments(selectedMovie.id)
    }

    console.log(Comments);

    useEffect(() => {
        setSeasonId(Seasons[0]?.id)
        setSeason(Seasons.find(s => s.id === Seasons[0]?.id))
    }, [Seasons])

    const text = selectedMovie?.description.replace(/\n/g, '<br>')
    const aboutText = isExpanded ? text : selectedMovie?.description.replace(/\n/g, ' -- ')?.slice(0, 90);

    const handleToggleMore = () => {
        setIsExpanded(!isExpanded);
    };

    const handleMoviePlayButton = (e) => {
        if (playSectionRef.current) {
            playSectionRef.current.style.display = "block";
        }
    }

    const handleSeriePlayButton = (sources) => {
        setSources(sources)

        if (playSectionRef.current) {
            playSectionRef.current.style.display = "block";
        }
    }

    return (
        <div className="single-movie">
            {selectedMovie && (
                <>
                <div className="info">

                    <div className="image">
                        <img src={selectedMovie.image} />
                    </div>

                    <div className="head">
                        {/* title */}
                        <div className="title">
                            {selectedMovie.title}
                        </div>
                        
                        {/* country */}
                        <div className="country">
                            محصول کشور {selectedMovie.country[0].title}
                        </div>

                        {/* list of categories */}
                        <div className="categories">
                            <div className="list" ref={scrollRef}>
                                {selectedMovie.genres.map((category, i) => (
                                    <div className="item" key={i}>
                                        {category.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* some more details */}
                        <div className="more">
                            <p className="rating">{selectedMovie.rating.toFixed(1)} : نظر کاربران</p>
                            <p className="imdb">{selectedMovie.imdb.toFixed(1)} : IMDB</p>
                        </div>

                        {/* show play button if type is movie */}
                        {selectedMovie.type === "movie" && <div className="play" >
                            <button className="play-btn" onClick={handleMoviePlayButton}><i className="pi pi-play"></i> Play</button>  
                        </div>}

                        {selectedMovie.type === "serie" && <div className="seasons">
                            <Dropdown value={seasonId} onChange={(e) => {
                                setSeasonId(e.value)
                                setSeason(Seasons.find(s => s.id === e.value))
                                }} options={Seasons} optionLabel="title"  optionValue="id" className="seasons-dropdown w-full md:w-14rem" />
                        </div>}

                    </div>

                </div>

                <div className="about" dangerouslySetInnerHTML={{ __html: aboutText }}></div>
                {text.length > 90 && (
                    <p className="more-btn" onClick={handleToggleMore}>
                    {isExpanded ? 'Less...' : 'More...'}
                    </p>
                )}
                
                {selectedMovie.type === "serie" && <div className="episodes container">
                    {season && season?.episodes.map(episode => (
                        <div className="episode grid">
                            <div className="episode-play col-1">
                                <button onClick={e => handleSeriePlayButton(episode.sources)}><i className="pi pi-play" /></button>
                            </div>
                            <div className="title col">
                                <div>
                                    {episode.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>}

                {selectedMovie.type === "serie" && PlaySection({sources, ref: playSectionRef})}
                {selectedMovie.type === "movie" && PlaySection({sources: selectedMovie.sources, ref: playSectionRef})}

                <div className="comments container">
                    {(!Comments) && (
                        <div className="load-comments" onClick={loadComments}>
                            {!pending && (<button className="load-comments-btn">
                                load comments
                            </button>)}
                            {pending && (<p>Loading...</p>)}
                        </div>
                    )}
                    {Comments && Comments.map(comment => (
                        <div className="comment">
                            <p className="user">{comment.user === "سردبیر مووی باکس" ? "سردبیر" : comment.user}</p>
                            <p className="content">
                                {
                                    decodeURIComponent(escape(atob(comment.content)))
                                        .replace("مووی باکس", "ats movie")
                                        .replace("موویباکس", "ats movie")
                                        .replace("moviebox", "ats movie")
                                }
                            </p>
                            <p className="created">{comment.created}</p>
                        </div>
                    ))}
                </div>
                </>
            )}
        </div>
    )
}

export default SingleMovie