import React, { useRef } from 'react'
import ScrollItem from './ScrollItem'
import FactItem from './FactItem'
import { useTransform, motion, useScroll, useSpring } from 'framer-motion';

const HorizontalScroller = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    const scrollProgress = useSpring(scrollYProgress, { bounce: false });
    const x = useTransform(scrollProgress, [0, 0.9], ["0%", "-65%"]);
    return (
        <section ref={targetRef} className='relative h-[200vh]'>
            <div className='sticky flex top-0 h-screen overflow-hidden'>
                <motion.div style={{ x, willChange: "transform", }} className='flex'>
                    <FactItem />
                    <ScrollItem />
                    <FactItem />
                </motion.div>
            </div>
        </section>
    )
}

export default HorizontalScroller
