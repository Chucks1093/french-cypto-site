import testimonialImg from '@/assets/Images/testimonialImg.svg'
import testimonialImg2 from '@/assets/Images/test2.svg'
import testimonialImg3 from '@/assets/Images/test3.svg'
import testimonialImg4 from '@/assets/Images/test4.svg'
import testimonialImg5 from '@/assets/Images/test5.svg'
export default function TestimonialImg() {
  return (
    <div className=' flex justify-center w-full '>
        <div className='  relative z-0'>
            <img src={testimonialImg2} alt="" className='w-[60px] ' />
        </div>
        <div className=' w-[60px] relative right-4 z-10'>
            <img src={testimonialImg3} alt=""  className='w-[60px]'/>
        </div>
        <div className=' absolute z-20'>
            <img src={testimonialImg} alt="" className='w-[60px]' />
        </div>
        <div className=' relative left-6 z-10'>
            <img src={testimonialImg5} alt=""  className='w-[60px] '/>
        </div>
        <div className=' w-[60px] relative z-0'>
            <img src={testimonialImg4} alt="" className='w-[60px] ' />
        </div>
    </div>
  )
}
