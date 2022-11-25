import { Avatar, Cell, Group } from "@vkontakte/vkui";
import React, {PropTypes} from "react";

const UserStats = (props) => {

    const {user} = props;

    return (
        <>
            <Group title={user.first_name}>
                <Cell
                    before={user.photo_200 ?<Avatar src={user.photo_200}/> : null}
                    description={user.city && user.city.title ? user.city.title : ''}
                >
                    {`${user.first_name} ${user.last_name}`}
                </Cell>
            </Group>
        </>
    )
}

// UserStats.propTypes = {
//     user: PropTypes.object.isRequired,
// };

export default UserStats;
