import face1 from '../../../images/faces/face1.svg';

function listerDesktop(team, posts, allUsers, handleChoose, setCurrRole) {

    return posts.map((player) => {
        let role = team + player;
        let user = allUsers.find(user => user.role == role);
        let username = user == undefined ? "" :  user.username;
  
        // megadom a roleok nevet
        let label_to_print;
        if (team === 'con') {
            switch(player) {
            case 1: label_to_print = "Leader of The Opposition"; break;
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
  
        // ez az ami kilistazza a formakat, tehat itt lehet editelni a "nevkartyakat"
        return (

            // egy sort terit vissza amiben van 2 sor
            <div key={player}>
            <div className="
                new-debate--card
                row
                justify-content-center
                align-items-center
                "
                onClick={() => {
                    handleChoose(team, player, setCurrRole);
                    }} key={player}
                >
                <div className="row">
                    <div className="
                        col-12
                        text-center
                        new-debate--card--label
                        "
                    >
                        {label_to_print}
                    </div>
                </div>
                <div className="row new-debate--card--participant" >
                    {/* Ide jon a kep */}
                    <div className="col-md-6 col-sm-12 new-debate--card--participant--img">
                        <img src={face1} className="new-debate--card--picture"  />
                    </div>
                    {/* Ide jon a username */}
                    <div className='
                        col-md-6 
                        col-sm-12
                        new-debate--card--participant--name
                        text-center
                        d-flex
                        justify-content-center
                        align-items-center
                        '
                        >
                            {username}
                    </div>
                </div>
            </div>
            {
                (player === 2) ?  <br></br>: null
            }
            </div>
          )
      })
}

export default listerDesktop;