import React from 'react'
import aboutImg from '../../assets/images/about.png';
import aboutCardImg from '../../assets/images/about-card.png';
import { Link } from 'react-router-dom';

const About = () => {
  return (
        <section>
            <div className='container'>
                <div className='flex justify-between gap-[50px] gap-[130px] gap-0 flex-row'>

                    {/* ======================== about content ====================== */}
                    <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
                        <h2 className='heading'>Serving the Nation</h2>
                        <p className='text__para'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex laborum omnis 
                            sint corporis eaque enim doloremque accusamus, laudantium molestiae.
                        </p>

                        <p className="text__para mt-[30px]">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex laborum omnis 
                            sint corporis eaque enim doloremque accusamus, laudantium molestiae.
                        </p>
                        <Link to='/'>
                        <button className='btn'>Learn More</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default About
