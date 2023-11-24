// mediaQuery.js
import { useMediaQuery as useReactResponsiveMediaQuery } from "react-responsive";

export const useMediaQuery = () => {
  const isMobile = useReactResponsiveMediaQuery({ maxWidth: 588 });
  const isTablet = useReactResponsiveMediaQuery({ minWidth: 589, maxWidth: 1023 });

  
  const fontSizeName =() =>{
      return isMobile ? '2em' : (isTablet ? '3em' : '5em');
  }

  const fontSizeDesc = () =>{
    return isMobile ? '0.9em' : (isTablet ? '0.8em' : '1em');
  }

    
  const heightImgPortfolio = () =>{
    return isMobile ? '150px' : (isTablet ? '180px' : '250px');
  }


  return { isMobile, isTablet, fontSizeName,  fontSizeDesc, heightImgPortfolio};
};
