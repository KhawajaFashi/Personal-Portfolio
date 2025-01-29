import React, { useRef } from 'react'
import ScrollItem from './ScrollItem'
import FactItem from './FactItem'
import { useTransform, motion, useScroll } from 'framer-motion';

const HorizontalScroller = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-50%"]);
    return (
        <section ref={targetRef} className='relative h-[200vh] w-[98.7vw]'>
            <div className='sticky flex top-0 h-screen items-center overflow-hidden'>
                <motion.div style={{ x }} className='flex relative'>
                    <ScrollItem />
                    <FactItem />
                </motion.div>
            </div>
        </section>
    )
}

export default HorizontalScroller