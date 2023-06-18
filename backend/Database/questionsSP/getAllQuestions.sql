
create procedure getAllQuestions
as 
begin
SELECT
    Q.qid,
    Q.date,
    Q.title,
    Q.body,
    ISNULL(tag_agg.tag_names, '') AS tag_names
FROM Questions Q
OUTER APPLY (
    SELECT
        STUFF(
            (
                SELECT ',' + T.tagname
                FROM TagsJoinQuestion TJ
                INNER JOIN Tags T ON TJ.tid = T.tid
                WHERE TJ.qid = Q.qid
                FOR XML PATH(''), TYPE
            ).value('.', 'NVARCHAR(MAX)'),
            1,
            1,
            ''
        ) AS tag_names
) AS tag_agg

where isDeleted =0


end
 --up returns strings, down returns array of objects

USE [StackOverflow]
GO
/****** Object:  StoredProcedure [dbo].[getAllQuestions]    Script Date: 6/17/2023 4:17:41 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   procedure [dbo].[getAllQuestions]
as 
begin
SELECT
    Q.qid,
    Q.date,
    Q.title,
    Q.body,
    Q.date
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
    Q.isDeleted = 0;

end

