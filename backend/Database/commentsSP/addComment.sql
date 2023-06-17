create proc addComment(@cid varchar(255), @aid varchar(255), @uid varchar(255), @comment varchar(255) )
as 
begin
insert into Comments (cid,aid,uid, comment)
values (@cid, @aid,@uid,@comment)
end