// import TopArrow from '@/assets/TopArrow.svg?react';
// import TopArrowHover from '@/assets/TopArrowHover.svg?react';
// import { useState } from 'react';

// function TopButton() {
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   const scrollToTop = () => {
//     window.scroll({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return (
//     <div
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       onClick={scrollToTop}
//       className={`w-[50px] h-[50px] rounded-full border-[3px] border-darkGrey flex items-center justify-center font-extrabold flex-col text-darkGrey hover: cursor-pointer ${
//         isHovered ? 'hover:text-violet hover:border-violet' : ''
//       }`}
//     >
//       {isHovered ? <TopArrowHover /> : <TopArrow />}
//       <div>TOP</div>
//     </div>
//   );
// }

// export default TopButton;
