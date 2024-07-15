--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12
-- Dumped by pg_dump version 14.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: dayoff; Type: TABLE; Schema: public; Owner: hadin
--

CREATE TABLE public.dayoff (
    id_day bigint NOT NULL,
    id_type integer NOT NULL,
    start_date date,
    reason character varying(255),
    id_prof integer NOT NULL,
    end_date date
);


ALTER TABLE public.dayoff OWNER TO hadin;

--
-- Name: dayoff_id_acc_seq; Type: SEQUENCE; Schema: public; Owner: hadin
--

CREATE SEQUENCE public.dayoff_id_acc_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dayoff_id_acc_seq OWNER TO hadin;

--
-- Name: dayoff_id_acc_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hadin
--

ALTER SEQUENCE public.dayoff_id_acc_seq OWNED BY public.dayoff.id_prof;


--
-- Name: dayoff_id_off_seq; Type: SEQUENCE; Schema: public; Owner: hadin
--

CREATE SEQUENCE public.dayoff_id_off_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dayoff_id_off_seq OWNER TO hadin;

--
-- Name: dayoff_id_off_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hadin
--

ALTER SEQUENCE public.dayoff_id_off_seq OWNED BY public.dayoff.id_day;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: hadin
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO hadin;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: hadin
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO hadin;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hadin
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: hadin
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO hadin;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: hadin
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO hadin;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hadin
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: off_left; Type: TABLE; Schema: public; Owner: hadin
--

CREATE TABLE public.off_left (
    id_off bigint NOT NULL,
    off_left character varying(255)
);


ALTER TABLE public.off_left OWNER TO hadin;

--
-- Name: off_left_id_off_seq; Type: SEQUENCE; Schema: public; Owner: hadin
--

CREATE SEQUENCE public.off_left_id_off_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.off_left_id_off_seq OWNER TO hadin;

--
-- Name: off_left_id_off_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hadin
--

ALTER SEQUENCE public.off_left_id_off_seq OWNED BY public.off_left.id_off;


--
-- Name: typeoff; Type: TABLE; Schema: public; Owner: hadin
--

CREATE TABLE public.typeoff (
    id_type bigint NOT NULL,
    type_name character varying(255)
);


ALTER TABLE public.typeoff OWNER TO hadin;

--
-- Name: offtype_id_type_seq; Type: SEQUENCE; Schema: public; Owner: hadin
--

CREATE SEQUENCE public.offtype_id_type_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.offtype_id_type_seq OWNER TO hadin;

--
-- Name: offtype_id_type_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hadin
--

ALTER SEQUENCE public.offtype_id_type_seq OWNED BY public.typeoff.id_type;


--
-- Name: profile; Type: TABLE; Schema: public; Owner: hadin
--

CREATE TABLE public.profile (
    id_prof bigint NOT NULL,
    username character varying(255),
    phone_number character varying(255),
    job_title character varying(255),
    email character varying(255),
    birth_date date,
    id_off bigint NOT NULL,
    password character varying(255)
);


ALTER TABLE public.profile OWNER TO hadin;

--
-- Name: profile_id_off_seq; Type: SEQUENCE; Schema: public; Owner: hadin
--

CREATE SEQUENCE public.profile_id_off_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_id_off_seq OWNER TO hadin;

--
-- Name: profile_id_off_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hadin
--

ALTER SEQUENCE public.profile_id_off_seq OWNED BY public.profile.id_off;


--
-- Name: profile_id_prof_seq; Type: SEQUENCE; Schema: public; Owner: hadin
--

CREATE SEQUENCE public.profile_id_prof_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_id_prof_seq OWNER TO hadin;

--
-- Name: profile_id_prof_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: hadin
--

ALTER SEQUENCE public.profile_id_prof_seq OWNED BY public.profile.id_prof;


--
-- Name: dayoff id_day; Type: DEFAULT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.dayoff ALTER COLUMN id_day SET DEFAULT nextval('public.dayoff_id_off_seq'::regclass);


--
-- Name: dayoff id_prof; Type: DEFAULT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.dayoff ALTER COLUMN id_prof SET DEFAULT nextval('public.dayoff_id_acc_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: off_left id_off; Type: DEFAULT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.off_left ALTER COLUMN id_off SET DEFAULT nextval('public.off_left_id_off_seq'::regclass);


--
-- Name: profile id_prof; Type: DEFAULT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.profile ALTER COLUMN id_prof SET DEFAULT nextval('public.profile_id_prof_seq'::regclass);


--
-- Name: profile id_off; Type: DEFAULT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.profile ALTER COLUMN id_off SET DEFAULT nextval('public.profile_id_off_seq'::regclass);


--
-- Name: typeoff id_type; Type: DEFAULT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.typeoff ALTER COLUMN id_type SET DEFAULT nextval('public.offtype_id_type_seq'::regclass);


--
-- Data for Name: dayoff; Type: TABLE DATA; Schema: public; Owner: hadin
--

COPY public.dayoff (id_day, id_type, start_date, reason, id_prof, end_date) FROM stdin;
13	1	2024-07-15	Demam	16	2024-07-15
14	1	2024-07-15	Demam	21	2024-07-15
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: hadin
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20240711213749_account.js	1	2024-07-12 04:38:49.548+07
2	20240711213758_dayoff.js	1	2024-07-12 04:38:49.576+07
3	20240711213810_off_left.js	1	2024-07-12 04:38:49.577+07
4	20240711213818_typeoff.js	1	2024-07-12 04:38:49.581+07
5	20240711213826_profile.js	1	2024-07-12 04:38:49.584+07
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: hadin
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: off_left; Type: TABLE DATA; Schema: public; Owner: hadin
--

COPY public.off_left (id_off, off_left) FROM stdin;
1	6 days
2	8 days
3	12 days
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: hadin
--

COPY public.profile (id_prof, username, phone_number, job_title, email, birth_date, id_off, password) FROM stdin;
1	sabrina mawar	8123456	web administrator	sabrinamawar@gmail.com	1999-05-02	1	sabrina123
11	ibrahim	\N	\N	ibrahim@gmail.com	\N	11	ibrahim123
12	tiara	\N	\N	tiara@gmail.com	\N	12	tiara123
7	jamet	087876435076	UI/UX	jamet@gmail.com	2024-07-12	7	jamet123
15	maduniun	\N	\N	madun@gmail.com	\N	15	madun123
3	komeng	851253476	frontend engineer	komeng@gmail.com	1970-08-24	3	spontanuhuy
21	Hadin Ibrahim	12345	Backend Engineer	hadin@gmail.com	2022-07-15	21	hadinibra
\.


--
-- Data for Name: typeoff; Type: TABLE DATA; Schema: public; Owner: hadin
--

COPY public.typeoff (id_type, type_name) FROM stdin;
1	Cuti sakit
2	Cuti Tahunan
3	Cuti menikah
4	Cuti menikahi anak
5	Cuti istri melahirkan
6	Cuti keluarga meninggal
\.


--
-- Name: dayoff_id_acc_seq; Type: SEQUENCE SET; Schema: public; Owner: hadin
--

SELECT pg_catalog.setval('public.dayoff_id_acc_seq', 3, true);


--
-- Name: dayoff_id_off_seq; Type: SEQUENCE SET; Schema: public; Owner: hadin
--

SELECT pg_catalog.setval('public.dayoff_id_off_seq', 14, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: hadin
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 5, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: hadin
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: off_left_id_off_seq; Type: SEQUENCE SET; Schema: public; Owner: hadin
--

SELECT pg_catalog.setval('public.off_left_id_off_seq', 3, true);


--
-- Name: offtype_id_type_seq; Type: SEQUENCE SET; Schema: public; Owner: hadin
--

SELECT pg_catalog.setval('public.offtype_id_type_seq', 6, true);


--
-- Name: profile_id_off_seq; Type: SEQUENCE SET; Schema: public; Owner: hadin
--

SELECT pg_catalog.setval('public.profile_id_off_seq', 21, true);


--
-- Name: profile_id_prof_seq; Type: SEQUENCE SET; Schema: public; Owner: hadin
--

SELECT pg_catalog.setval('public.profile_id_prof_seq', 21, true);


--
-- Name: dayoff dayoff_pkey; Type: CONSTRAINT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.dayoff
    ADD CONSTRAINT dayoff_pkey PRIMARY KEY (id_day);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: off_left off_left_pkey; Type: CONSTRAINT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.off_left
    ADD CONSTRAINT off_left_pkey PRIMARY KEY (id_off);


--
-- Name: typeoff offtype_pkey; Type: CONSTRAINT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.typeoff
    ADD CONSTRAINT offtype_pkey PRIMARY KEY (id_type);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: hadin
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (id_prof);


--
-- PostgreSQL database dump complete
--

