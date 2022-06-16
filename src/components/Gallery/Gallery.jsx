import { useEffect, useState } from 'react';

import anime from 'animejs/lib/anime.es.js';
import classNames from 'classnames'

import la from './left-arrow.png'
import ra from './right-arrow.png'
import PropTypes from 'prop-types'
import './index.css'

export const Gallery = ({items}) => {
    const [it, setIt] = useState(0) // Selected Item (Default 0)

    useEffect(() => {
        const images = []
        function preload(igs) {
            for (var i = 0; i < igs.length; i++) {
                images[i] = new Image();
                images[i].src = igs[i].img;
            }
        }
        preload(items)
        console.log('Preloading...', items)
    }, [items])

    const move = (by) => {
        const np = parseInt(it) + parseInt(by) // new item position
        if (typeof items[np] !== 'undefined') {

            let translateInitial = '100vw'
            let translateFinal = '0'
            if (by < 0) {
                translateInitial = '-100vw'
            }
            anime({
                targets: '.rh-gal .item',
                translateX: translateInitial,
                easing: 'easeInOutSine',
                duration: 500,
                width: 0,
            })
            setTimeout(() => {
                setIt(np)
                anime({
                    targets: '.rh-gal .item',
                    translateX: translateFinal,
                    duration: 500,
                    easing: 'easeInOutSine',
                    width: '100%',
                })
            }, 400)
        }
    }

    return (<>
        <div className={classNames('rh-gal', { "blured": items[it].blur, "parallax": items[it].parralax })}>
            <div className='item' style={{ background: `url(${items[it].img})`, width: '100vw', height: '100vh' }} />
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

Gallery.defaultTypes = {
    items: [],
}

Gallery.propTypes = {
    items: PropTypes.arrayOf(Object).isRequired
}