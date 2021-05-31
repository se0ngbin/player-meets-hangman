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

--  add interests and questions here in the format provided

insert into "Interest" (name) values ('sex');

select new_question('do you like i scream?', array['yes', 'no', 'i scream too']);
