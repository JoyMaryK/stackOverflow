create proc getQuestionTags(@qid varchar (255))
AS
BEGIN
select * from Tags where tid in (select tid from TagsJoinQuestion where qid =@qid)
end