import face1 from '../../../images/faces/face1.svg';

function listerMobile(team, posts, allUsers, handleChoose, setCurrRole) {

    return posts.map((player) => {
        let role = team + player;
        let user = allUsers.find(user => user.role == role);
        let username = user == undefined ? "" :  user.username;
  
        // megadom a roleok nevet
        let lang=localStorage.getItem('lang')
        let label_to_print;
        if (lang === 'en')
        {
            if (team === 'con') {
                switch(player) {
                case 1: label_to_print = "Deputy Leader of The Opposition"; break;
                case 2: label_to_print = "Deputy Leader of The Opposition"; break;
                case 3: label_to_print = "Member of Opposition"; break;
                case 4: label_to_print = "Opposition Whip"; break;
                }
            } else {
                switch(player) {
                case 1: label_to_print = "Prime Minister"; break;
                case 2: label_to_print = "Deputy Prime Minister"; break;
                case 3: label_to_print = "Member of The Government"; break;
                case 4: label_to_print = "Government Whip"; break;
                }
            }
        }
        else 
        {
            if (team === 'con') {
                switch(player) {
                case 1: label_to_print = "Ellenzéki Vezető"; break;
                case 2: label_to_print = "Ellenzéki Vezető Helyettese"; break;
                case 3: label_to_print = "Ellenzéki képviselő"; break;
                case 4: label_to_print = "Ellenzéki Záróbeszélő"; break;
                }
            } else {
                switch(player) {
                case 1: label_to_print = "Miniszterelnök"; break;
                case 2: label_to_print = "Miniszterelnök Helyettese"; break;
                case 3: label_to_print = "Kormányképviselő"; break;
                case 4: label_to_print = "Kormány Záróbeszélője"; break;
                }
            }
        }
  
        // ez az ami kilistazza a formakat, tehat itt lehet editelni a "nevkartyakat"
        return (
  
          // egy sort terit vissza amiben van 2 sor
          <>
          <div className="
              new-debate--card
              new-debate--card--mobile
              row
              justify-content-center
              align-items-center
              "
              onClick={() => handleChoose(team, player, setCurrRole)} key={player}
              >
              
              {/* <div className="new-debate--card--participant" > */}
                  {/* Ide jon a kep */}
                  <div className="col-4 new-debate--card--participant--img">
                      <img src={face1} className="new-debate--card--picture-mobile"  />
                  </div>
                  {/* Ide jon a username */}
                  <div className='
                      col-8
                      new-debate--card--participant--name
                      text-center
                      justify-content-center
                      align-items-center
                      '
                      >
                        <div className="
                            row
                            text-center
                            new-debate--card--label
                            "
                        >
                            <div className="col-12
                                            text-center">
                                {label_to_print}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12
                                            text-center">
                                {username}
                            </div>
                        </div>
                  </div>
              {/* </div> */}
              {/* <div className="row"> */}
              {/* </div> */}
          </div>
          {
              (player == 2) ?  <br></br>: null
          }
          </>
        )
      })
}

export default listerMobile;