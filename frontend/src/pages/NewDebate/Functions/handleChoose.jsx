import axiosInstance from '../../../axios';

function handleChoose(team, nr, ready, setCurrRole) {
    if (!ready) {
        let role;
        if ( nr != null) {
            role = team + nr;
        } else {
            role = team;
        } 

        axiosInstance
            .get('user/', {params:{'role':role}})
            .then((res) => {
		console.log(res.data)
		console.log(res.data.length)
                if (res.data.length == 0) {
                    setCurrRole(role);
                
                    axiosInstance
                    .patch('user/current/', {'role':role})
                    .then((res) => {
    
                    })
                    .catch((err) => {
                    });


                } else {
                    if (role != "spectator")
                    {
                        console.log('nemjo');
                        alert(role + 'is already chosen')
                    }
                    else
                    {
                        setCurrRole(role);
                        
                        axiosInstance
                        .patch('user/current/', {'role':role})
                        .then((res) => {
                            
                        })
                        .catch((err) => {
                        });
                    }
                }
            })
            .catch(() => {
                console.log('Baj van teso');
                setCurrRole(role);
                
                axiosInstance
                .patch('user/current/', {'role':role})
                .then((res) => {

                })
                .catch((err) => {
                });
            });
    } else {
        alert('You must not be ready in order to change role.');
    }
}

export default handleChoose;