create procedure addAnswer (@aid varchar(255), @qid varchar(255), @uid varchar(255), @answer text)
as 
begin
insert into Answers (aid, qid, uid,answer )
values(@aid,@qid,@uid,@answer)
end