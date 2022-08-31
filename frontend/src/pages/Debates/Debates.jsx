import React from 'react';
import ReadMore from './ReadMore/ReadMore';
import './Debates.css';


const text = " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque viverra feugiat nibh, vitae tincidunt arcu finibus nec. Integer tempus metus vitae lectus efficitur scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean faucibus lobortis ante sed ornare. Aenean magna velit, eleifend et magna pellentesque, blandit maximus nisi. Cras placerat, risus vestibulum dapibus lacinia, metus libero porttitor nibh, quis consectetur turpis arcu at ligula. Vestibulum laoreet tristique lorem. Maecenas lacinia leo vitae velit euismod, a tempor elit eleifend. In imperdiet magna sit amet felis commodo, vel ornare neque sodales. Proin a scelerisque nunc. Sed tempor rutrum leo ut viverra. Nullam neque massa, venenatis ut elementum id, porttitor vel est. Integer vel convallis sem, eget ultrices lectus. Aliquam quis enim sed mauris egestas vestibulum non eleifend nibh. In posuere est in massa aliquam, sit amet ullamcorper augue viverra. Sed pretium facilisis molestie.\n\n Donec malesuada magna et lectus vehicula ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed quam leo, pellentesque quis elit a, convallis sodales tellus. Nam eleifend lacus vel nisl tincidunt varius. Cras auctor mauris vel mi bibendum, in rutrum nulla pulvinar. Nunc vitae erat at sem finibus ultrices. In hac habitasse platea dictumst. Maecenas tristique sem odio. In pharetra leo non efficitur dignissim. Proin ac consectetur ex. Aenean sollicitudin pharetra sapien, sit amet pharetra elit. Ut eu euismod leo. Suspendisse ullamcorper sem eget augue iaculis, non venenatis urna vestibulum. ";

function Debates() {
  return (
    <div className="debates--base base">
        <div className="container debates--container bg-light">
            <div className="row debates--header-row bg-light p-4">
                <div className="col-4 debates--header-title-cont">
                    <h1 className="debates--header-title">
                        Vitaformátumok
                    </h1>
                </div>
                <div className="col-8 debates--header-elements">
                    {/*<h2 className="debates--header-elements">*/}
                    {/*    Header Elements*/}
                    {/*</h2>*/}
                </div>
            </div>
            <div className="row debates--elements-row p-4">
                <div className="debates--elements-col col-4">
                    <h1 className="debates--elements--title">
                        Brit Parlamenti
                    </h1>
                    <ReadMore>
                        A brit parlamenti viták négy, egyenként két-két felszólalóból álló csapatból állnak, amelyek két oldalra oszlanak, amelyek az indítvány mellett és ellen szólalnak fel. A vita brit parlamenti eljárásból való eredete miatt az oldalakat kormánynak és ellenzéknek nevezik. Minden felszólaló legfeljebb hétperces beszédet tart.
Az oldalak első felszólalói definiálják a tételmondatot, majd felsorolják az érveiket, a második felszólalók cáfolni próbálják az ellenfél érveit, új érveket hoznak be, illetve visszaépítik a cáfolatot kapott érveiket. A harmadik felszólaló feladata a kiterjesztés, egy új szempontból kell megközelítenie a tételmondatot és behoznia egy friss érvet, míg az utolsó felszólaló az összefoglaló szerepet tölti be, vagyis összefoglalja, mi hangzott el a vitán és nem hozhat be új érvet.

                    </ReadMore>
                </div>
                <div className="debates--elements-col col-4">
                    <h1 className="debates--elements--title">
                        World Schools
                    </h1>
                    <ReadMore>
                        A World Schools Style Debating (vagy WSS) a brit parlamenti és az ausztrál-ázsiai vitázási formátumok kombinációja, amelyet az iskolai vitaversenyek világbajnokságának igényeihez terveztek. Minden vita nyolc beszédből áll, amelyeket két háromfős csapat tart, a javaslattevő és az ellenzéki oldal képviseletében. Az első hat beszéd nyolc percig tart, majd mindkét csapat egy négyperces záróbeszéddel fejezi be a vitát. A csapatoknak 30-60 perc áll rendelkezésükre a beszédek előkészítésére.
                    </ReadMore>
                </div>
                <div className="debates--elements-col col-4">
                    <h1 className="debates--elements--title">
                        Karl Popper
                    </h1>
                    <ReadMore>
                        Minden vitában két csapat vesz részt. Az egyik csapat az igenlő fél szerepét kapja meg, a másik pedig a másik a nemleges felet. A szerep (fél) kiválasztása előzetesen történik. Minden csapat három-öt vitázóból áll, akik közül hárman aktívan részt vesznek a vitában. A csapat a vita elején közli a három aktív vitázó nevét és sorrendjét. Egy csapat vitapartnerei szabadon cserélődhetnek a csapaton belül a verseny során, de nem a vita során.
                    </ReadMore>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Debates