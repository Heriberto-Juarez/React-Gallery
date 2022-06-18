import { useEffect, useState, useRef } from 'react';

import anime from 'animejs/lib/anime.es.js';
import classNames from 'classnames'

import la from './left-arrow.png'
import ra from './right-arrow.png'
import PropTypes from 'prop-types'
import './index.css'

export const Gallery = ({ items, width, height, type, disableControls, interval, loop }) => {
    const [it, setIt] = useState(0) // Selected Item (Default 0)
    const [moving, setMoving] = useState(1)
    const imageRef = useRef(null)
    const types = {
        DEFAULT: "default",
        FADE: "fade-blur"
    }

    useEffect(() => {
        const images = []
        function preload(igs) {
            for (var i = 0; i < igs.length; i++) {
                images[i] = new Image();
                images[i].src = igs[i].img;
            }
        }
        preload(items)
        console.log('Preloading items', items)
    }, [items])

    useEffect(()=>{
        let i
        
        if (loop){
            i = setInterval(()=>{
                move(1)
        }, interval)
        }

        return ()=>{
            if (loop){
                clearInterval(i)
            }
        }

    }, [loop, interval, it])

    const move = (by) => {
        let np = parseInt(it) + parseInt(by) // new item position
        if (typeof items[np] === 'undefined') {
            np = 0
        }
        if (typeof items[np] !== 'undefined') {
            let translateInitial = '100vw'
            if (by < 0) {translateInitial = '-100vw'}

            if (imageRef.current) {
                const el = imageRef.current
                const options1 = {targets: el}

                if (type === types.DEFAULT) {
                    options1.transform = `translateX(${translateInitial})`
                    options1.easing = 'linear',
                    options1.duration = 300
                    options1.width = 0
                    options1.opacity = 0.5
                } else if (type === types.FADE) {
                    options1.easing = 'easeOutCirc'
                    options1.duration = 300
                    options1.visibility = "hidden"
                    options1.backgroundColor = "blue"
                    options1.filter = 'blur(12px)'
                }

                const anim1 = anime(options1)

                anim1.finished.then(() => {
                    setIt(np)
                    const options2 = { targets: el }

                    if (type === types.DEFAULT) {
                        options2.easing = 'easeInOutCirc'
                        options2.transform = 'translateX(0)'
                        options2.duration = 300
                        options2.width = "100%",
                        options2.backgroundPosition = 'center'
                        options2.opacity = 1
                    } else if (type === types.FADE) {
                        options2.easing = 'easeInOutExpo'
                        options2.duration = 400
                        options2.backgroundColor = "blue"
                        options2.filter = 'blur(0px)'
                    }


                    const anim2 = anime(options2)

                    anim2.finished.then(() => {
                        if (type === types.DEFAULT) {
                            el.style.removeProperty('transform') // If transform has a value then background-attachment: fixed won't work, therefore we have to remove this value.
                        }
                        el.style.removeProperty("filter")
                    })
                })
            }
        }
    }

    return (<>
        <div className={classNames('rh-gal', { "blured": items[it].blur || false, "parallax": items[it].parallax || false })} style={{
            width: width,
            height: height
        }} >
            <div className='item'
                ref={imageRef}
                style={{
                    backgroundImage: `url(${items[it].img})`,
                    width: '100%',
                    height: '100%',
                }}
            />
            <div className="rh-children">
                {items[it].children && items[it].children}
            </div>
            {!disableControls && <div className='rh-controls'>
                <div className='control left' onClick={() => move(-1)}>
                    <img src={la} alt="Left arrow" />
                </div>
                <div className='control right' onClick={() => move(1)}>
                    <img src={ra} alt="Right arrow" />
                </div>
            </div>}
        </div>
    </>);
}

Gallery.defaultProps = {
    items: [],
    width: '100vw',
    height: '100vh',
    type: "default",
    disableControls: false,
    loop: false,
    interval: 5000,
}

Gallery.propTypes = {
    items: PropTypes.arrayOf(Object).isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    type: PropTypes.string,
    disableControls: PropTypes.bool,
    loop: PropTypes.bool,
    interval: PropTypes.number,
}