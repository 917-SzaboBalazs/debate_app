import React from 'react';
import { useState } from 'react';

import './ReadMore.css';

function ReadMore(props) {
    let text = props.children;
    const [ isReadMore, setReadMore ] = useState(true);

    const toggleReadMore = () => {
        setReadMore(!isReadMore);
    };

  return (
    <>
    <p className="readmore--paragraph" >
        {
            isReadMore ? text.slice(0, 400) : text
        }
        <span onClick={toggleReadMore} className='readmore--read-hide'>
            {
                isReadMore ? '...read more' : '...show less'
            }
        </span>
    </p>
    </>
  )
}

export default ReadMore;

{/* <p className="debates--elements-paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra feugiat nibh, vitae tincidunt arcu finibus nec. Integer tempus metus vitae lectus efficitur scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus lobortis ante sed ornare. Aenean magna velit, eleifend et magna pellentesque, blandit maximus nisi. Cras placerat, risus vestibulum dapibus lacinia, metus libero porttitor nibh, quis consectetur turpis arcu at ligula. Vestibulum laoreet tristique lorem. Maecenas lacinia leo vitae velit euismod, a tempor elit eleifend. In imperdiet magna sit amet felis commodo, vel ornare neque sodales. Proin a scelerisque nunc. Sed tempor rutrum leo ut viverra. Nullam neque massa, venenatis ut elementum id, porttitor vel est. Integer vel convallis sem, eget ultrices lectus. Aliquam quis enim sed mauris egestas vestibulum non eleifend nibh. In posuere est in massa aliquam, sit amet ullamcorper augue viverra. Sed pretium facilisis molestie.
                    <br/><br/>
                    Donec malesuada magna et lectus vehicula ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed quam leo, pellentesque quis elit a, convallis sodales tellus. Nam eleifend lacus vel nisl tincidunt varius. Cras auctor mauris vel mi bibendum, in rutrum nulla pulvinar. Nunc vitae erat at sem finibus ultrices. In hac habitasse platea dictumst. Maecenas tristique sem odio. In pharetra leo non efficitur dignissim. Proin ac consectetur ex. Aenean sollicitudin pharetra sapien, sit amet pharetra elit. Ut eu euismod leo. Suspendisse ullamcorper sem eget augue iaculis, non venenatis urna vestibulum.
                    </p> */}