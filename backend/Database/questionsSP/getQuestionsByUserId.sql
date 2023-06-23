
CREATE PROCEDURE getQuestionsByUserId(@uid varchar(255), @PageNumber INT)
AS
BEGIN
    DECLARE @PageSize INT = 3;

    SELECT
        Q.qid,
        Q.date,
        Q.title,
        Q.body,
        (
            SELECT T.tagname
            FROM TagsJoinQuestion TJ
            INNER JOIN Tags T ON TJ.tid = T.tid
            WHERE TJ.qid = Q.qid
            FOR JSON PATH
        ) AS tag_names,
        ISNULL(AC.answer_count, 0) AS answer_count
    FROM
        Questions Q
    LEFT JOIN
        (
            SELECT qid, COUNT(*) AS answer_count
            FROM Answers
            GROUP BY qid
        ) AC ON Q.qid = AC.qid
    WHERE
        Q.isDeleted = 0
        AND Q.uid = @uid
    ORDER BY
        Q.date DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
END
