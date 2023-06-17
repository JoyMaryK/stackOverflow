create proc addQuestionTags (@tid varchar(255), @qid varchar(255))
as 
begin
insert into TagsJoinQuestion(tid, qid)
values (@tid, @qid)
end