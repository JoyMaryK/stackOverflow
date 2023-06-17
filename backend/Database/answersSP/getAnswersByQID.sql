create procedure getAnswersByQID(@qid varchar(255))
as 
begin 
select * from Answers where qid=@qid
end