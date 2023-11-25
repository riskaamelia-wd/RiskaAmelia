// mediaQuery.js
import { useMediaQuery as useReactResponsiveMediaQuery } from "react-responsive";

export const useMediaQuery = () => {
  const isMobile = useReactResponsiveMediaQuery({ maxWidth: 588 });
  const isTablet = useReactResponsiveMediaQuery({ minWidth: 589, maxWidth: 1023 });

  const portfolio = () => {
    return isMobile ? 4 : (isTablet? 6 : 6)
  }

  const fontSizeName =() =>{
      return isMobile ? '2.7em' : (isTablet ? '3.8em' : '6em');
  }

  const fontSizeDesc = () =>{
    return isMobile ? '0.8em' : (isTablet ? '0.8em' : '1em');
  }

    
  const heightImgPortfolio = () =>{
    return isMobile ? '150px' : (isTablet ? '180px' : '250px');
  }


  return { isMobile, isTablet, fontSizeName,  fontSizeDesc, heightImgPortfolio, portfolio};
};
