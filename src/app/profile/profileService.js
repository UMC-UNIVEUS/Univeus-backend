import pool from '../../../config/database';
import { response, errResponse, baseResponse } from "../../../config/response";
import {
    userIdCheck
} from "./profileProvider";
import {createIntroduction, deleteIntroduction, modifyProfilebyId, selectUserProfilebyId} from "./profileDao";
import {userIntroductionBodyReformattingDTO} from "./profileRequestDTO";


// 기존에 있던 프로필 소개 정보를 수정하는 API
export const ModifyIntroProfile = async (defaultInfo, detailInfo, user_id) => {
    // user가 존재하는지 체크
    const userExist = await userIdCheck(user_id);
    if (!userExist[0][0]) {
        return errResponse(baseResponse.USER_USERID_NOT_EXIST);
    }
    const connection = await pool.getConnection(async (conn) => conn);
    const modifyprofilebyIdResult = modifyProfilebyId(connection, [
        defaultInfo.nickname,
        defaultInfo.gender,
        defaultInfo.profile_img,
        detailInfo.interest,
        detailInfo.introduce,
        user_id
    ]);

    connection.release();
    return response(baseResponse.SUCCESS);
};


export const modifyUserProfile = async(user_id) => {


}

//여기서부터 새로 작성한 부분

/* N문 N답 생성 */
export const createUserIntroduction = async(userId, body) => {
    const connection = await pool.getConnection(async (conn) => conn);
    const createUserIntroductionResult = await createIntroduction(connection,
        await userIntroductionBodyReformattingDTO(userId, body));
    connection.release();
    return true;
}

/* N문 N답 수정 */
export const modifyUserIntroduction = async(userId, body) => {
    const connection = await pool.getConnection(async (conn) => conn);
    await deleteIntroduction(connection, userId);
    const modifyUserIntroductionResult = await createIntroduction(connection,
        await userIntroductionBodyReformattingDTO(userId, body));
    connection.release();
    return true;
}
