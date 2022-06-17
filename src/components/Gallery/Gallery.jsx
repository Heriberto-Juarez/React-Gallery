import { useEffect, useState, useRef } from 'react';

import anime from 'animejs/lib/anime.es.js';
import classNames from 'classnames'

import la from './left-arrow.png'
import ra from './right-arrow.png'
import PropTypes from 'prop-types'
import './index.css'

export const Gallery = ({items, width, height}) => {
    const [it, setIt] = useState(0) // Selected Item (Default 0)
    const imageRef = useRef(null)

    useEffect(() => {
        const images = []
        function preload(igs) {
            for (var i = 0; i < igs.length; i++) {
                images[i] = new Image();
                images[i].src = igs[i].img;
            }
        }
        preload(items)
    }, [items])

    const move = (by) => {
        const np = parseInt(it) + parseInt(by) // new item position
        if (typeof items[np] !== 'undefined') {
            let translateInitial = '100vw'
            if (by < 0) {
                translateInitial = '-100vw'
            }
            if (imageRef.current){
                const el = imageRef.current
                const anim1 = anime({
                    targets: el,
                    transform: `translateX(${translateInitial})`,
                    easing: 'easeInOutSine',
                    duration: 200,
                    width: 0,
                    opacity: 0.4,
                })
                anim1.finished.then(()=>{
                    setIt(np)
                    const anim2 = anime({
                        targets: el,
                        transform: 'translateX(0)',
                        duration: 400,
                        easing: 'easeInOutSine',
                        width: '100%',
                        backgroundPosition: 'center',
                        opacity: 1,
                    })
                    anim2.finished.then(()=>{
                        el.style.removeProperty('transform') // If transform has a value then background-attachment: fixed won't work, therefore we have to remove this value.
                    })
                })
            }
        }
    }

    return (<>
        <div className={classNames('rh-gal', { "blured": items[it].blur || false, "parallax": items[it].parallax || false })} style={{
             width: width, 
             height: height
        }} ref={imageRef}>
            <div className='item'
                style={{
                    backgroundImage: `url(${items[it].img})`, 
                    width: '100%',
                    height: '100%',
                }}
             />
            <div className="rh-children">
                {items[it].children && items[it].children}
            </div>
            <div className='rh-controls'>
                <div className='control left' onClick={() => move(-1)}>
                    <img src={la} alt="Left arrow" />
                </div>
                <div className='control right' onClick={() => move(1)}>
                    <img src={ra} alt="Right arrow" />
                </div>
            </div>
        </div>
    </>);
}

Gallery.defaultProps = {
    items: [],
    width: '100vw',
    height: '100vh'
}

Gallery.propTypes = {
    items: PropTypes.arrayOf(Object).isRequired,
    width: PropTypes.string,
    height: PropTypes.string
}