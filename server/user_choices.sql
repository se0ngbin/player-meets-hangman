delete from "Interest";
delete from "MakeOrBreakPossibleAnswer";
delete from "MakeOrBreakQuestion";

CREATE OR REPLACE FUNCTION new_question(in question varchar, in answers varchar[]) RETURNS void as
$BODY$
DECLARE
    q_id UUID;
    answer varchar;
BEGIN
    insert into "MakeOrBreakQuestion" (text) values (question) returning id into q_id;

    foreach answer in array answers
    LOOP
        insert into "MakeOrBreakPossibleAnswer" (mobqid, text) values (q_id, answer);
    END LOOP;

END;
$BODY$ 
LANGUAGE plpgsql VOLATILE;

--  add genders, interests and questions here in the format provided

-- genders --

insert into "Gender" (name) values ('Male');
insert into "Gender" (name) values ('Female');
insert into "Gender" (name) values ('M2F Transsexual');
insert into "Gender" (name) values ('F2M Transsexual');
insert into "Gender" (name) values ('Non-binary');
insert into "Gender" (name) values ('Not applicable');

-- interests -- 

insert into "Interest" (name) values ('sex');
insert into "Interest" (name) values ('more sex');

-- make or break questions --

select new_question('do you like i scream?', array['yes', 'no', 'i scream too']);
