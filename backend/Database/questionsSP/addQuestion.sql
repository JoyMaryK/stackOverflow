create procedure addQuestion (@qid varchar(255),@uid varchar(255), @title varchar(255), @body TEXT)

as 
begin 
insert into Questions(qid,uid,title,body)
values(@qid,@uid,@title,@body)
end