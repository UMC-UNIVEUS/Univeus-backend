/*Profile 관련 데이터베이스, Query가 작성되어 있는 곳*/

import {connect} from "pm2";


// 여기서부터 새롭게 작성하는 부분

export const createIntroduction = async(connection, params) => {
    const createIntroductionQuery = `
    INSERT into user_introduction(user_id, Q1, Q2, Q3, Q4, Q5, Q6)
    VALUES (?, ?, ?, ?, ?, ?, ?) ;`;

    const [row] = await connection.query(createIntroductionQuery, params);
    return row;
}

export const deleteIntroduction = async(connection, userId) => {
    const deleteIntroductionQuery = `
    DELETE FROM user_introduction
    WHERE user_id = ?;`;

    const [row] = await connection.query(deleteIntroductionQuery, userId);
    return row;
}

export const selectUserIntroduction = async(connection, userId) => {
    const selectUserIntroductionQuery = `  
    SELECT *
    FROM user_introduction
    WHERE user_id = ?;`;

    const [row] = await connection.query(selectUserIntroductionQuery, userId);
    return row;
}

export const selectUserInfo = async(connection, userId) => {
    const selectUserInfoQuery = `
    SELECT *
    FROM user
    WHERE 
    `
}