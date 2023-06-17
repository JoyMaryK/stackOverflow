create procedure addTag (@tid varchar(255), @tagname varchar(255), @description varchar(255))
as 
begin
insert into Tags (tid, tagname, description )
values(@tid,@tagname,@description)
end