DO $$
DECLARE
  v_function_oid oid;
  v_definition text;
BEGIN
  SELECT p.oid
  INTO v_function_oid
  FROM pg_proc p
  JOIN pg_namespace n ON n.oid = p.pronamespace
  WHERE n.nspname = 'public'
    AND p.proname = 'get_user_collection_groups'
    AND p.oid::regprocedure::text = 'get_user_collection_groups(uuid,text,text,text,text,text,text,text,text,integer,integer)';

  IF v_function_oid IS NULL THEN
    RAISE EXCEPTION 'Função get_user_collection_groups não encontrada';
  END IF;

  SELECT pg_get_functiondef(v_function_oid)
  INTO v_definition;

  v_definition := replace(
    v_definition,
    '(array_agg(uc.card_types ORDER BY uc.is_in_binder DESC, uc.created_at DESC))[1] AS card_types',
    'min(uc.card_types::text)::text[] AS card_types'
  );

  IF strpos(v_definition, 'min(uc.card_types::text)::text[] AS card_types') = 0 THEN
    RAISE EXCEPTION 'Agregação card_types não encontrada na função';
  END IF;

  EXECUTE v_definition;
END;
$$;
