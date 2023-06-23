create procedure updateQuestion( @qid varchar(255), @uid varchar(255), @title varchar(255), @body TEXT )
as 
begin
update Questions set title=@title, body=@body
where qid=@qid and uid=@uid
end