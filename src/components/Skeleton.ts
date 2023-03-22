const skeletonTemplate = (repetition: number = 20): string => {
  const template = `<li>
     <a href="#">
       <div class="item-card">
         <div class="item-thumbnail skeleton"></div>
         <div class="item-title skeleton"></div>
         <div class="item-score skeleton"></div>
       </div>
     </a>
   </li>`;

  return template.repeat(repetition);
};

export default skeletonTemplate;
