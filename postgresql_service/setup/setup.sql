-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.0-alpha
-- PostgreSQL version: 14.0
-- Project Site: pgmodeler.io
-- Model Author: Jedson Gabriel

-- object: public."user" | type: TABLE --
-- DROP TABLE IF EXISTS public."user" CASCADE;
CREATE TABLE public."user" (
	id text NOT NULL,
	name text NOT NULL,
	email text NOT NULL,
	salt text NOT NULL,
	password_hash char(60),
	CONSTRAINT user_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public."user" OWNER TO adm;
-- ddl-end --

-- object: public.coupon | type: TABLE --
-- DROP TABLE IF EXISTS public.coupon CASCADE;
CREATE TABLE public.coupon (
	id uuid NOT NULL,
	code text,
	expiry timestamp with time zone,
	id_user text NOT NULL,
	id_coupon_promotion uuid NOT NULL,
	CONSTRAINT cupon_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.coupon OWNER TO adm;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public.coupon DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public.coupon ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.store | type: TABLE --
-- DROP TABLE IF EXISTS public.store CASCADE;
CREATE TABLE public.store (
	id serial NOT NULL,
	name text NOT NULL,
	CONSTRAINT store_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.store OWNER TO adm;
-- ddl-end --

-- object: public.form | type: TABLE --
-- DROP TABLE IF EXISTS public.form CASCADE;
CREATE TABLE public.form (
	id serial NOT NULL,
	id_store integer NOT NULL,
	id_coupon_promotion uuid NOT NULL,
	CONSTRAINT form_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.form OWNER TO adm;
-- ddl-end --

-- object: store_fk | type: CONSTRAINT --
-- ALTER TABLE public.form DROP CONSTRAINT IF EXISTS store_fk CASCADE;
ALTER TABLE public.form ADD CONSTRAINT store_fk FOREIGN KEY (id_store)
REFERENCES public.store (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.form_question | type: TABLE --
-- DROP TABLE IF EXISTS public.form_question CASCADE;
CREATE TABLE public.form_question (
	id serial NOT NULL,
	inquiry text NOT NULL,
	id_form integer NOT NULL,
	CONSTRAINT form_question_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.form_question OWNER TO adm;
-- ddl-end --

-- object: form_fk | type: CONSTRAINT --
-- ALTER TABLE public.form_question DROP CONSTRAINT IF EXISTS form_fk CASCADE;
ALTER TABLE public.form_question ADD CONSTRAINT form_fk FOREIGN KEY (id_form)
REFERENCES public.form (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.user_form_question | type: TABLE --
-- DROP TABLE IF EXISTS public.user_form_question CASCADE;
CREATE TABLE public.user_form_question (
	id serial NOT NULL,
	answer text NOT NULL,
	id_user text NOT NULL,
	id_form_question integer NOT NULL,
	CONSTRAINT user_form_pk PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.user_form_question OWNER TO adm;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public.user_form_question DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public.user_form_question ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: form_question_fk | type: CONSTRAINT --
-- ALTER TABLE public.user_form_question DROP CONSTRAINT IF EXISTS form_question_fk CASCADE;
ALTER TABLE public.user_form_question ADD CONSTRAINT form_question_fk FOREIGN KEY (id_form_question)
REFERENCES public.form_question (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: public.coupon_promotion | type: TABLE --
-- DROP TABLE IF EXISTS public.coupon_promotion CASCADE;
CREATE TABLE public.coupon_promotion (
	id uuid NOT NULL,
	expiry timestamp with time zone,
	coupon_valid_time time,
	percent_discount double precision,
	description text,
	abs_discount double precision,
	id_store integer NOT NULL,
	CONSTRAINT copon_promotion_pk PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON TABLE public.coupon_promotion IS E'template coupon to give to users';
-- ddl-end --
ALTER TABLE public.coupon_promotion OWNER TO adm;
-- ddl-end --

-- object: store_fk | type: CONSTRAINT --
-- ALTER TABLE public.coupon_promotion DROP CONSTRAINT IF EXISTS store_fk CASCADE;
ALTER TABLE public.coupon_promotion ADD CONSTRAINT store_fk FOREIGN KEY (id_store)
REFERENCES public.store (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: coupon_promotion_fk | type: CONSTRAINT --
-- ALTER TABLE public.coupon DROP CONSTRAINT IF EXISTS coupon_promotion_fk CASCADE;
ALTER TABLE public.coupon ADD CONSTRAINT coupon_promotion_fk FOREIGN KEY (id_coupon_promotion)
REFERENCES public.coupon_promotion (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: coupon_promotion_fk | type: CONSTRAINT --
-- ALTER TABLE public.form DROP CONSTRAINT IF EXISTS coupon_promotion_fk CASCADE;
ALTER TABLE public.form ADD CONSTRAINT coupon_promotion_fk FOREIGN KEY (id_coupon_promotion)
REFERENCES public.coupon_promotion (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --


