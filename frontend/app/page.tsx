'use client'

import { delay } from 'motion';
import { motion } from 'motion/react';
import Link from 'next/link';


export default function Home() {

  const variants = {
    in: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 1.2,
        duration: 1.2
      }
    },
    out: {
      opacity: 0,
      y: -30,
    }
  }

  const delayed = {
    in: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 5,
        duration: 0.6
      }
    },
    out: {
      opacity: 0,
      y: 30,
    }
  }

  return (
    <motion.div 
      className='pt-24 pb-36 w-screen h-full flex flex-col justify-center text-center'
      variants={variants}
      initial='out'
      whileInView='in'
    >
      <motion.h1 variants={variants} className='flex-auto text-3xl'>Here's the deal:</motion.h1>
      <motion.h1 variants={variants} className='flex-auto text-5xl'>
        We're gonna <b className='primary'>Let</b> <b className='secondary'>You</b> <b className='tertiary'>Cook</b>
      </motion.h1>
      <motion.h2 variants={variants} className='flex-auto text-4xl'>Don't burn down the kitchen please...</motion.h2>

      <motion.div
        className='flex-initial w-52 m-auto border h-max rounded-2xl bg-blue-100 hover:bg-blue-300'
        variants={delayed}
        initial='out'
        whileInView={'in'}
      > 
        <Link href={'/find'}>
          <p className='text-3xl py-2'>Bet.</p>
        </Link>
      </motion.div>
    </motion.div>
  );
}
