import axiosInstance from "../../../axios";

function getDebateCurrent(
    setSomeError,
    setErrorMessage,
    setDebateType,
    setEntryCode,
    focused,
    setMotion,
    setAllUsers,
    setPosts,
    setDebaterArray,
    navigate
) {
    axiosInstance
        .get('debate/current/')
        .then((res) => {
            // console.log(res);
        setSomeError(false);
        setErrorMessage('');
        setDebateType(res.data.type);
        setEntryCode(res.data.entry_code);

        // ha nincs fokuszban a textfield, csak akkor frissitse a motiont
        /*if (!focused) {
            setMotion(res.data.motion);
        }*/
        setAllUsers(res.data.participants);
        setPosts(setDebaterArray(4));
        if (res.data.status != 'lobby') {
            navigate('/in-debate');
        }
        })
        // abban az esetben ha nincs current user (tehat guest lesz)
        .catch((err) => {
            console.log("nem vagy bejelentkezve");
        });
}

export default getDebateCurrent