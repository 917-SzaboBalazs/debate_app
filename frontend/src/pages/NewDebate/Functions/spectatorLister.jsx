import React from 'react'
import face1 from '../../../images/faces/face1.svg';

export default function spectatorLister(
    allUsers
) {
    let spectators = allUsers.filter(user => user.role == 'spectator')

    return spectators.map((spectator) => {
        let username = spectator == undefined ? "undef" : spectator.username

        return (
            <>
                <div className="col-md-6 col-sm-6 new-debate--spectator-card">
                    <div className="row">
                        {/* ide jon a kepe */}
                        <div className="col-md-3 col-sm-3 new-debate--spectator-card--participant--img">
                            <img src={face1} className="new-debate--spectator-card--picture"  />
                        </div>
                        {/* ide jon a neve */}
                        <div className="col-9 new-debate--spectator-card--username">
                            {username}
                        </div>
                    </div>
                </div>
            </>
        )
    })
}
