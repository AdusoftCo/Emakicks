--
-- PostgreSQL database dump
--

\restrict eFyubredJ2SPJfajaOahZFdNZDR2RdI44h5OFgw4QEJgckeMUF1pyxxXoHRvkHk

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.1 (Ubuntu 18.1-1.pgdg24.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: proyecto; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA proyecto;


ALTER SCHEMA proyecto OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: camisonetas; Type: TABLE; Schema: proyecto; Owner: postgres
--

CREATE TABLE proyecto.camisonetas (
    id integer NOT NULL,
    cod_art character varying(10) NOT NULL,
    id_prov integer NOT NULL,
    descripcion character varying(200) NOT NULL,
    costo numeric(10,2) DEFAULT NULL::numeric,
    precio_doc numeric(10,2) DEFAULT NULL::numeric,
    precio_oferta numeric(10,2) DEFAULT NULL::numeric,
    fecha_alta date,
    fecha_baja date,
    imagen character varying(500) DEFAULT NULL::character varying
);


ALTER TABLE proyecto.camisonetas OWNER TO postgres;

--
-- Name: camisonetas_id_seq; Type: SEQUENCE; Schema: proyecto; Owner: postgres
--

CREATE SEQUENCE proyecto.camisonetas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE proyecto.camisonetas_id_seq OWNER TO postgres;

--
-- Name: camisonetas_id_seq; Type: SEQUENCE OWNED BY; Schema: proyecto; Owner: postgres
--

ALTER SEQUENCE proyecto.camisonetas_id_seq OWNED BY proyecto.camisonetas.id;


--
-- Name: fabricants; Type: TABLE; Schema: proyecto; Owner: postgres
--

CREATE TABLE proyecto.fabricants (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    fec_alta date,
    telefono character varying(20) DEFAULT NULL::character varying
);


ALTER TABLE proyecto.fabricants OWNER TO postgres;

--
-- Name: fabricants_id_seq; Type: SEQUENCE; Schema: proyecto; Owner: postgres
--

CREATE SEQUENCE proyecto.fabricants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE proyecto.fabricants_id_seq OWNER TO postgres;

--
-- Name: fabricants_id_seq; Type: SEQUENCE OWNED BY; Schema: proyecto; Owner: postgres
--

ALTER SEQUENCE proyecto.fabricants_id_seq OWNED BY proyecto.fabricants.id;


--
-- Name: femeninterior; Type: TABLE; Schema: proyecto; Owner: postgres
--

CREATE TABLE proyecto.femeninterior (
    id integer NOT NULL,
    cod_art character varying(10) NOT NULL,
    id_prov integer NOT NULL,
    descripcion character varying(200) NOT NULL,
    costo numeric(10,2) DEFAULT NULL::numeric,
    precio_doc numeric(10,2) DEFAULT NULL::numeric,
    precio_oferta numeric(10,2) DEFAULT NULL::numeric,
    fecha_alta date,
    fecha_baja date,
    imagen character varying(500) DEFAULT NULL::character varying
);


ALTER TABLE proyecto.femeninterior OWNER TO postgres;

--
-- Name: femeninterior_id_seq; Type: SEQUENCE; Schema: proyecto; Owner: postgres
--

CREATE SEQUENCE proyecto.femeninterior_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE proyecto.femeninterior_id_seq OWNER TO postgres;

--
-- Name: femeninterior_id_seq; Type: SEQUENCE OWNED BY; Schema: proyecto; Owner: postgres
--

ALTER SEQUENCE proyecto.femeninterior_id_seq OWNED BY proyecto.femeninterior.id;


--
-- Name: locales; Type: TABLE; Schema: proyecto; Owner: postgres
--

CREATE TABLE proyecto.locales (
    id integer NOT NULL,
    nropiso integer NOT NULL,
    tipolocal character varying(10) NOT NULL,
    numlocal integer NOT NULL,
    razonsocial character varying(50) DEFAULT NULL::character varying,
    rubro character varying(50) DEFAULT NULL::character varying,
    propietario character varying(50) DEFAULT NULL::character varying,
    celular character varying(25) NOT NULL,
    redsocial character varying(50) DEFAULT NULL::character varying,
    imagen character varying(100) DEFAULT NULL::character varying,
    fechaalta date,
    fecactualzda date
);


ALTER TABLE proyecto.locales OWNER TO postgres;

--
-- Name: locales_id_seq; Type: SEQUENCE; Schema: proyecto; Owner: postgres
--

CREATE SEQUENCE proyecto.locales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE proyecto.locales_id_seq OWNER TO postgres;

--
-- Name: locales_id_seq; Type: SEQUENCE OWNED BY; Schema: proyecto; Owner: postgres
--

ALTER SEQUENCE proyecto.locales_id_seq OWNED BY proyecto.locales.id;


--
-- Name: masculinos; Type: TABLE; Schema: proyecto; Owner: postgres
--

CREATE TABLE proyecto.masculinos (
    id integer NOT NULL,
    cod_art character varying(10) NOT NULL,
    id_prov integer NOT NULL,
    descripcion character varying(200) NOT NULL,
    costo numeric(10,2) DEFAULT NULL::numeric,
    precio_doc numeric(10,2) DEFAULT NULL::numeric,
    precio_oferta numeric(10,2) DEFAULT NULL::numeric,
    fecha_alta date,
    fecha_baja date,
    imagen character varying(500) DEFAULT NULL::character varying
);


ALTER TABLE proyecto.masculinos OWNER TO postgres;

--
-- Name: masculinos_id_seq; Type: SEQUENCE; Schema: proyecto; Owner: postgres
--

CREATE SEQUENCE proyecto.masculinos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE proyecto.masculinos_id_seq OWNER TO postgres;

--
-- Name: masculinos_id_seq; Type: SEQUENCE OWNED BY; Schema: proyecto; Owner: postgres
--

ALTER SEQUENCE proyecto.masculinos_id_seq OWNED BY proyecto.masculinos.id;


--
-- Name: medias; Type: TABLE; Schema: proyecto; Owner: postgres
--

CREATE TABLE proyecto.medias (
    id integer NOT NULL,
    cod_art character varying(10) NOT NULL,
    id_prov integer NOT NULL,
    descripcion character varying(200) NOT NULL,
    costo numeric(10,2) DEFAULT NULL::numeric,
    precio_doc numeric(10,2) DEFAULT NULL::numeric,
    precio_oferta numeric(10,2) DEFAULT NULL::numeric,
    fecha_alta date,
    fecha_baja date,
    imagen character varying(500) DEFAULT NULL::character varying
);


ALTER TABLE proyecto.medias OWNER TO postgres;

--
-- Name: medias_id_seq; Type: SEQUENCE; Schema: proyecto; Owner: postgres
--

CREATE SEQUENCE proyecto.medias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE proyecto.medias_id_seq OWNER TO postgres;

--
-- Name: medias_id_seq; Type: SEQUENCE OWNED BY; Schema: proyecto; Owner: postgres
--

ALTER SEQUENCE proyecto.medias_id_seq OWNED BY proyecto.medias.id;


--
-- Name: niveles; Type: TABLE; Schema: proyecto; Owner: postgres
--

CREATE TABLE proyecto.niveles (
    id integer NOT NULL,
    nivel character varying(20) NOT NULL
);


ALTER TABLE proyecto.niveles OWNER TO postgres;

--
-- Name: productos; Type: TABLE; Schema: proyecto; Owner: postgres
--

CREATE TABLE proyecto.productos (
    id integer NOT NULL,
    cod_art character varying(10) DEFAULT NULL::character varying,
    id_prov integer,
    descripcion character varying(200) DEFAULT NULL::character varying,
    precio_doc numeric(10,2) DEFAULT NULL::numeric,
    precio_oferta numeric(10,2) DEFAULT NULL::numeric,
    costo numeric(10,2) DEFAULT NULL::numeric,
    fecha_alta date,
    fecha_baja date,
    imagen character varying(500) DEFAULT NULL::character varying,
    stock bigint,
    is_on_offer boolean,
    category character varying(50) NOT NULL
);


ALTER TABLE proyecto.productos OWNER TO postgres;

--
-- Name: productos_id_seq; Type: SEQUENCE; Schema: proyecto; Owner: postgres
--

CREATE SEQUENCE proyecto.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE proyecto.productos_id_seq OWNER TO postgres;

--
-- Name: productos_id_seq; Type: SEQUENCE OWNED BY; Schema: proyecto; Owner: postgres
--

ALTER SEQUENCE proyecto.productos_id_seq OWNED BY proyecto.productos.id;


--
-- Name: variaciones; Type: TABLE; Schema: proyecto; Owner: postgres
--

CREATE TABLE proyecto.variaciones (
    id integer NOT NULL,
    producto_id integer NOT NULL,
    color character varying(50) DEFAULT NULL::character varying,
    talla character varying(50) DEFAULT NULL::character varying,
    stock bigint
);


ALTER TABLE proyecto.variaciones OWNER TO postgres;

--
-- Name: variaciones_id_seq; Type: SEQUENCE; Schema: proyecto; Owner: postgres
--

CREATE SEQUENCE proyecto.variaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE proyecto.variaciones_id_seq OWNER TO postgres;

--
-- Name: variaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: proyecto; Owner: postgres
--

ALTER SEQUENCE proyecto.variaciones_id_seq OWNED BY proyecto.variaciones.id;


--
-- Name: camisonetas id; Type: DEFAULT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.camisonetas ALTER COLUMN id SET DEFAULT nextval('proyecto.camisonetas_id_seq'::regclass);


--
-- Name: fabricants id; Type: DEFAULT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.fabricants ALTER COLUMN id SET DEFAULT nextval('proyecto.fabricants_id_seq'::regclass);


--
-- Name: femeninterior id; Type: DEFAULT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.femeninterior ALTER COLUMN id SET DEFAULT nextval('proyecto.femeninterior_id_seq'::regclass);


--
-- Name: locales id; Type: DEFAULT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.locales ALTER COLUMN id SET DEFAULT nextval('proyecto.locales_id_seq'::regclass);


--
-- Name: masculinos id; Type: DEFAULT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.masculinos ALTER COLUMN id SET DEFAULT nextval('proyecto.masculinos_id_seq'::regclass);


--
-- Name: medias id; Type: DEFAULT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.medias ALTER COLUMN id SET DEFAULT nextval('proyecto.medias_id_seq'::regclass);


--
-- Name: productos id; Type: DEFAULT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.productos ALTER COLUMN id SET DEFAULT nextval('proyecto.productos_id_seq'::regclass);


--
-- Name: variaciones id; Type: DEFAULT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.variaciones ALTER COLUMN id SET DEFAULT nextval('proyecto.variaciones_id_seq'::regclass);


--
-- Data for Name: camisonetas; Type: TABLE DATA; Schema: proyecto; Owner: postgres
--

COPY proyecto.camisonetas (id, cod_art, id_prov, descripcion, costo, precio_doc, precio_oferta, fecha_alta, fecha_baja, imagen) FROM stdin;
1	800	17	Camison Dama M.Corta Alg.Jersey Estampado T.46 al 60	7800.00	9750.00	10140.00	2024-09-16	\N	1705693776_camMangaCorta.jpg
2	801	17	Camison Dama M.Larga Alg.Jersey T.46 al 60	8000.00	10000.00	10400.00	2024-08-13	\N	1723562444_1706037845_camMLarga.jpg
3	802	17	Camison Dama Musculosa Alg.Jersey T.46 al 60	7800.00	9750.00	10140.00	2024-09-16	\N	1723562274_1705606406_camMusculosa.jpeg
4	803	17	Pijama Dama M.Larga Invierno T.1 al 8	12200.00	15250.00	15860.00	2024-09-16	\N	woman2.jpg
5	804	17	Pijama Niño/Juvenil M.Larga Invierno T.1 al 14	8000.00	10000.00	10400.00	2024-08-13	\N	
6	805	17	Pijama Hombre M.Larga Invierno T.1 al 6	12200.00	15250.00	15860.00	2024-09-16	\N	men.jpg
7	806	17	Pijama Dama Manga Larga Alg.Estamp.T.1 al 6	10200.00	12750.00	13260.00	2024-09-16	\N	
\.


--
-- Data for Name: fabricants; Type: TABLE DATA; Schema: proyecto; Owner: postgres
--

COPY proyecto.fabricants (id, nombre, fec_alta, telefono) FROM stdin;
1	Danoi	2023-02-07	1131362079
2	Curemy	2023-02-07	1133268429
3	Bellisima	2023-02-07	1128645967
4	Ciriaco J & L	2023-02-07	\N
5	Elvis	2023-02-07	1144055405
6	Barack	2023-02-07	1158037876
7	Jenka	2023-02-07	\N
8	M x M	2023-02-07	\N
9	Malena	2023-02-07	\N
10	Rosalu	2023-02-07	\N
11	Sugary	2023-02-07	\N
12	Zantino -Edwin	2023-02-07	\N
13	Elemento	2023-02-07	\N
14	Mundo	2023-02-07	\N
15	Dufour	2023-02-07	\N
16	G3	2023-02-07	114991-3479
17	Stefy -Angel	2023-02-07	\N
18	Hernan -Pjms	2023-02-07	\N
19	Loren's	2023-02-07	\N
20	DEENY	2023-02-07	\N
21	CAPICUA	2023-02-07	\N
22	LUANA	2023-02-24	\N
24	COCOT	2023-03-01	
25	RHYTON	2023-03-01	
26	DYNAMIC FOOT	2023-03-01	
27	MALENA	2023-03-01	
28	FLOYD	2025-04-25	\N
29	ELEMENTO ROPA	2025-11-28	1156285650
\.


--
-- Data for Name: femeninterior; Type: TABLE DATA; Schema: proyecto; Owner: postgres
--

COPY proyecto.femeninterior (id, cod_art, id_prov, descripcion, costo, precio_doc, precio_oferta, fecha_alta, fecha_baja, imagen) FROM stdin;
4	29	4	Bombacha Universal C/Elastico Escama Alg.Lyc.Estamp/Lisos	12900.00	16770.00	1666.25	2024-07-05	\N	
5	600-DISCON	11	Bombacha Universal Dama Alg.Lycra Lisa	12900.00	16770.00	1666.25	2024-08-13	\N	
7	07/P	8	Ultra Especial Alg.L Lisa Elast.Coronita	32315.00	42009.50	4120.16	2024-09-30	\N	1724254209_especBomMxM.png
8	08/P	8	Ultra Super Especial MxM Alg.L Lisa	36685.00	47690.50	4677.34	2024-09-30	\N	
9	112/P	8	Universal Dama Alg.Lycra Clasica Lisa	21390.00	27807.00	2727.23	2024-09-30	\N	1724254716_univBomMxM.png
10	600/P	8	Vedetina Especial Dama Alg.Lycra T.3 4 5	14260.00	18538.00	1818.15	2024-09-30	\N	
11	25	1	Bombacha Señora Embut.T.6 Extra Grande	13800.00	17940.00	1782.50	2024-07-05	\N	
12	24	1	Bombacha Señora Embut.T.5 Extra Grande	13100.00	17030.00	1692.08	2024-07-05	\N	
13	27	1	Bombacha Señora Embut.Alg.Estamp T.1 al 4	11900.00	15470.00	1537.08	2024-07-05	\N	
14	27-0	1	Bombacha Señora Embut.Alg.Estampada T.0 	6000.00	7800.00	775.00	2024-07-05	\N	
15	27-TC	1	Bombacha Tiro Corto Alg.Estampada	10300.00	13390.00	1330.42	2024-07-05	\N	
16	112-DISCON	19	Colaless Dama Alg.L M y L / Idem Culot Less	10000.00	13000.00	1291.67	2024-08-13	\N	
17	113-DISCON	19	Vedetina Dama Alg.L M y L	10500.00	13650.00	1356.25	2024-08-13	\N	
18	104	7	Colaless Dama Alg.Lyc.Estamp. Varios	8580.00	11154.00	1108.25	2024-07-05	\N	
19	401	7	Boxer Juvenil Alg.Lyc. Estamp. Varios	14850.00	19305.00	1918.13	2024-07-05	\N	
20	800	2	Culote Dama Manos Esp.Alg.Lycra (y ROSA)	25000.00	32500.00	3229.17	2024-07-05	\N	
21	5214/34	20	Culote Dama Vedetina Alg.L Cint.Puntilla S/STOCK	\N	4300.00	500.00	2023-05-24	\N	
22	650	2	Culote Dama Patitas Alg.L (y ROSA)	\N	9500.00	900.00	2023-05-24	\N	
23	705	2	Boxer Dama Especial Alg.L (y ROSA)	\N	11200.00	1100.00	2023-05-24	\N	\N
24	49	10	Tiro Corto Dama L Alg.Lycra Liso	11000.00	14300.00	1402.50	2024-09-19	\N	
25	48	10	Tiro Corto Dama M Alg.Lycra Liso	9300.00	12090.00	1185.75	2024-09-19	\N	
26	8053NEU	21	Bombachas lycra del L al XXXL	\N	6800.00	750.00	2023-02-03	\N	\N
27	K721	21	Bombacha Dama Microfibra (L-XL) (XXL-XXXL)	\N	19.00	1200.00	2023-05-24	\N	\N
28	230/1511	21	Vedetinas Microfibra Varios Talles	\N	6000.00	750.00	2023-02-03	\N	\N
29	2315	21	Vedetina c/Encaje del L al XXL	\N	6000.00	750.00	2023-02-03	\N	\N
32	3001L	21	Culote encaje [TODOS LOS MODELOS]	\N	6100.00	750.00	2023-02-24	\N	\N
33	A0410	21	Vedetina Faja Microfibra del M al XL	\N	8500.00	800.00	2023-02-24	\N	\N
45	020	22	Conjunto Dama Desagujado Arm.Less Aro	\N	15100.00	1500.00	2023-05-24	\N	
47	08	22	Conjunto Dama Triang.Alg Picot Less S/Aro	\N	12750.00	1250.00	2023-05-24	\N	\N
48	010	22	Conjunto Dama Triang.Alg Puntilla Less S/Aro	\N	12750.00	1250.00	2023-05-24	\N	
50	07	22	Comjunto Dama Triang Victoria/Tomy/Calvin S/Aro	\N	13500.00	1250.00	2023-05-24	\N	
51	23	1	Bombacha Nena Embut.Alg.Estamp t.0 al 4	\N	3900.00	475.00	2023-05-24	\N	
52	24	1	Bombacha Nena Embut.Alg.Estamp T.5	\N	4500.00	500.00	2023-05-24	\N	
53	22	4	Culote Nena Alg.L Estamp T.2-4	3600.00	4680.00	465.00	2023-06-27	\N	
54	620	7	Bombacha Nena Alg.L.Estamp.Faja T.1-2-3	\N	5000.00	500.00	2023-05-24	\N	
56	630	7	Culote Nena Alg.L.Estamp Faja T.4	\N	6100.00	600.00	2023-05-24	\N	
57	650	7	Bombacha Nena Alg.L.Estamp T.4	\N	6100.00	600.00	2023-05-24	\N	
60	55	3	Conjunto Nena Bretel Alg.L T.Unico	\N	6700.00	900.00	2023-05-24	\N	
61	83	3	Conjunto Nena Bretel Alg.L C/Push T.Unico	\N	8100.00	900.00	2023-05-24	\N	
62	88	3	Conjunto Nena Deportivo Alg.L C/Push T.Unico	\N	9500.00	1000.00	2023-05-24	\N	
70	31	4	Super Especial Dama Alg.L Lisa	\N	7200.00	1050.00	2023-05-24	\N	\N
191	032	22	Conjunto Dama Versalles/Tomy/Calvin Arm.Less Aro	\N	16150.00	1500.00	2023-05-24	\N	\N
192	47	10	Vedetina Dama L Alg.Lycra Lisas	10700.00	13910.00	1364.25	2024-09-19	\N	
193	46	10	Vedetina Dama M Alg.Lycra Lisas	8300.00	10790.00	1058.25	2024-09-19	\N	
194	45	10	Colaless Dama S Alg.Lycra Lisas	6700.00	8710.00	854.25	2024-09-19	\N	
\.


--
-- Data for Name: locales; Type: TABLE DATA; Schema: proyecto; Owner: postgres
--

COPY proyecto.locales (id, nropiso, tipolocal, numlocal, razonsocial, rubro, propietario, celular, redsocial, imagen, fechaalta, fecactualzda) FROM stdin;
1	1	Gondola	1	Emakick Lingerie	Lenceria	Oscar	5491150511072	https://facebook.com/oaduviri	local2.png	2024-09-10	2024-09-23
2	1	Gondola	2	Janes	Ropa de Dama	Mary	5491156532820	https://facebook.com/jane.fernandezdaga	localEX24.png	2024-09-10	2024-09-25
5	2	Local	21	Sol City	\N	Wilmer	1170564152	Lo de Fede	1727274077_localEX2024.png	2024-09-13	2024-09-24
6	1	Local	4	Willmer	\N	Willmer	1150501072	instagran	1727276132_localEX824.png	2024-09-16	2024-10-01
\.


--
-- Data for Name: masculinos; Type: TABLE DATA; Schema: proyecto; Owner: postgres
--

COPY proyecto.masculinos (id, cod_art, id_prov, descripcion, costo, precio_doc, precio_oferta, fecha_alta, fecha_baja, imagen) FROM stdin;
1	12062	15	BOXER ALGODON RAYAS ANCHAS SIN COSTURA	31038.00	40349.40	4009.08	2024-09-18	\N	
2	12050	15	BOXER ALGODON LISO SIN COSTURA	31511.00	40964.30	4070.17	2024-09-18	\N	
3	12056	15	BOXER ALGODON LABRADO SIN COSTURA	31038.00	40349.40	4009.08	2024-09-18	\N	
4	501	6	BOXER HOMBRE SIN COSTURA LISO-S al XL	27000.00	35100.00	3442.50	2025-02-26	\N	
5	501	6	BOXER HOMBRE SIN COSTURA LISO-XXL	28440.00	36972.00	3626.10	2025-02-26	\N	
6	520	6	BOXER HOMBRE SIN COSTURA RAYADO -S al XL	27840.00	36192.00	3549.60	2025-02-26	\N	
7	520	6	BOXER HOMBRE SIN COSTURA RAYADO- XXL	28920.00	37596.00	3687.30	2025-02-26	\N	1724269669_boxBarack520.png
8	77	12	BOXER ADULTO Elast.Anc.Alg/L Rayado/Liso t.3 al 6	15000.00	19500.00	1937.50	2024-08-12	\N	
12	3900	16	Boxer Clásico Alg.Lycra Elast.en Relieve a Tono PIERNA CORTA- S al XXL	4536.00	60571.93	5824.22	2025-02-26	\N	
13	3200B	16	Boxer Clásico Elast.Ancho Alg.Lycra PIERNA MEDIA- 3XL al 5XL	5466.00	72990.78	7018.34	2025-02-26	\N	
14	3207-38	16	Boxer Alg.Lycra Elast.Ancho Estamp. VARIOS- S al XXL	5268.00	70346.76	6764.11	2025-02-26	\N	
15	3030B	16	Boxer Elast.Ancho Alg.Lycra ESTAMPADOS SURTIDOS- 3XL al 5XL	5775.00	77117.04	7415.10	2025-02-26	\N	
16	3200	16	Boxer Clásico Elast.Ancho Alg.Lycra PIERNA MEDIA- S al XXL	4536.00	60571.93	5824.22	2025-02-26	\N	
17	CP7018(19)	21	Boxer Hombre Seda Fria ESTAMP.SURTIDOS- L al XXXL	26700.00	34710.00	3448.75	2024-08-12	\N	
18	CP7200(20)	21	Slips Hombre Elast.Ancho Alg/Lycra- L al XXXL	28100.00	36530.00	3629.58	2024-08-12	\N	
19	CP7700(21)	21	Slips Hombre Elast.Ancho Alg/L Especial- 4XL al 6XL	29500.00	38350.00	3810.42	2024-08-12	\N	
20	99	5	Slips Hombre Alg.Jersey Embutido Liso T.2 al 5	10900.00	14170.00	1389.75	2024-09-19	\N	
21	100	5	Slips Hombre Triple Cost.Alg.Jersey Liso T.2 al 5	12000.00	15600.00	1530.00	2024-09-19	\N	
22	101	5	Slips Hombre Triple Cost.Especial Alg.Jersey Liso T.7-8	15500.00	20150.00	1976.25	2024-09-19	\N	
23	102	5	Slips Niño Embut.Alg.Jersey Estamp. T.1 al 4	8100.00	10530.00	1032.75	2024-09-19	\N	
24	12058	15	Boxer Hombre C/Elastico Alg.Lycra Liso	40700.00	52910.00	5257.08	2024-07-05	\N	
\.


--
-- Data for Name: medias; Type: TABLE DATA; Schema: proyecto; Owner: postgres
--

COPY proyecto.medias (id, cod_art, id_prov, descripcion, costo, precio_doc, precio_oferta, fecha_alta, fecha_baja, imagen) FROM stdin;
29	740/3	13	Termica Chicos Extra Alg.Lycra Surtido T.3	27500.00	29106.00	2983.75	2025-03-10	\N	1723300612_1709402804_soketeMujer24.png
30	750	13	Termica Juvenil Extra Alg.Lycra Surtido T.4	30349.00	32121.38	3292.87	2025-03-10	\N	
31	022/023	13	Invisible Dama Estamp-Liso B/N	13296.00	14072.49	1442.62	2025-03-10	\N	1724268530_invElem023e.png
32	101	13	Soquete Dama Estamp/Deportiva/Lisa Surt/B/N 	14575.00	15426.18	1581.39	2025-03-10	\N	
33	551	13	Soquete Dama Soft c.Lengueta Toalla planta	16330.00	17283.67	1771.81	2025-03-10	\N	
34	200/201/20	13	Media Caña Dama Rayada/Lisa Surt/Estamp/B/N	19279.00	20404.89	2091.77	2025-03-10	\N	
35	203-SIN ST	13	Media 3/4 Dama Lisa surtida/Negra	22006.00	23291.15	2387.65	2024-10-07	\N	
36	720	13	Termica 3/4 Dama Extra Alg.Lycra Surtida	35218.00	37274.73	3821.15	2025-03-10	\N	
37	011	13	Invisible Alta Hombre Surt.Liso/ByN/Negro	14853.00	15720.42	1611.55	2025-03-10	\N	
38	012/013	13	Invisible Alta Hombre Clasico Surt./Urbano	14853.00	15720.42	1611.55	2025-03-10	\N	
39	102	13	Soquete Hombre Deportivo/Liso Surt./Rayado/Blanco/Negro	16364.00	17319.66	1775.49	2025-03-10	\N	
40	501	13	Soquete Soft Hombre c.Lengueta Toalla Planta	18283.00	19350.73	1983.71	2025-03-10	\N	
41	951/952/95	13	Media Hombre Clasico/Moderno/Rombo/Neg/Azul/Blanc/Urbano	22172.00	23466.84	2405.66	2025-03-10	\N	
42	953D-L	13	Soquete Alto Hombre FIT Deportivo-Liso	19748.00	20901.28	2142.66	2025-03-10	\N	
43	730	13	Termico 3/4 Hombre Extra Alg.Lycra Surtida	38908.00	41180.23	4221.52	2025-03-10	\N	
44	333	14	Media Hombre Termica Estampada	31234.00	40604.20	3982.34	2025-02-07	\N	
45	9020	14	Media Hombre Deportivo Toalla Liso B/N	12768.00	16598.40	1649.20	2024-08-08	\N	
46	1010/1012	14	Soquete Hombre Estampado/Liso B-N	11380.00	14794.00	1450.95	2025-02-07	\N	
47	666	14	Media Dama Termica Estampada 	29136.00	37876.80	3714.84	2025-02-07	\N	
48	6020	14	Media Dama Deportivo Toalla B/N	13855.00	18011.50	1766.51	2025-02-07	\N	
49	4010/4012	14	Soquete Dama Alg.Estampada/Lisa B-N	10535.00	13695.50	1343.21	2025-02-07	\N	
50	505	25	Medias Hombre Alg.Liso Surtido Color	11230.00	14599.00	1450.54	2024-09-18	\N	
51	2000	26	Medias Tubo TOALLA VARIOS COLORES	\N	2500.00	300.00	2023-05-01	\N	
52	1002	24	Pantymedia Multifilam.Dama T.1 al 4 Color 32/34/Negro	13400.00	17420.00	1708.50	2024-09-18	\N	
53	1053	24	Pantymedia Multifil Dama T.5 Color 32/Negro	15800.00	20540.00	2014.50	2024-09-18	\N	
54	420	24	Medias 3/4 Multifilam.Dama 2 Pares Color 32/N	12600.00	16380.00	1606.50	2024-09-18	\N	
55	102	27	Media Red C/puntilla silicona (blanco ,negro, rojo)	\N	9200.00	1100.00	2023-03-01	\N	
56	101	27	Media Lycra C/puntilla Silicona (Negro y Rojo)	\N	9200.00	1100.00	2023-03-01	\N	
57	112	27	Media de Red C/ puntilla Ancha colores (Rojo y Negro)	\N	9200.00	1100.00	2023-03-01	\N	
58	111	27	Media Lycra C/puntilla Ancha colores (Negro,Rojo)	\N	9200.00	1100.00	2023-03-01	\N	
59	402	27	Panty Portaliga Red colores (Negro y Rojo)	\N	14500.00	1100.00	2023-03-01	\N	
60	401	27	Panty Portaliga Lisa colores (Negro y Rojo)	\N	14500.00	1100.00	2023-03-01	\N	
61	202	27	Panty Medias Red (Blanco,Negro,Rojo y Natural)	\N	9500.00	1100.00	2023-03-01	\N	
62	205	27	Portaliga C/Puntilla Colores ( Blanco,Negro y Rojo)	\N	11500.00	1100.00	2023-03-01	\N	
63	31	27	Media 7/8 Lycra  Colores surt-Negro	\N	7200.00	800.00	2023-03-01	\N	
70	740	13	Térmica Extra Alg/Lycra Surtidas Chicos T.2	26400.00	27941.76	2864.40	2025-03-10	\N	
78	104	13	Soquete Chicos Blanco/Azul/Estampado Surt. T.1	11023.00	11666.74	1196.00	2025-03-10	\N	
79	104	13	Soquete Blanco/Azul/Estampado Surt./ Varon T.2	11962.00	12660.58	1297.88	2025-03-10	\N	
80	105	13	Soquete Juvenil Blanco/Azul/Estampado Surt. T.4	13470.00	14256.65	1461.50	2025-03-10	\N	
81	104-3	13	Soquete Chicos Blanco/Azul/Estampado Surt. T.3	13000.00	13759.20	1410.50	2025-03-10	\N	
82	105	13	Soquete Juvenil Blanco/Azul/Estampado Surt.T.5	14400.00	15240.96	1562.40	2025-03-10	\N	
91	1020	13	Media Caña Chicos Surtida Estampado/Varon T.0	12200.00	12912.48	1323.70	2025-03-10	\N	
92	1020-1	13	Media Caña Surtida Estampado/Varon T.1	12698.00	13439.56	1377.73	2025-03-10	\N	
93	1020	13	Media Caña Surtida Estampado/ Varon T.2	14397.00	15237.78	1562.07	2025-03-10	\N	
94	1020-3	13	Media Caña Surtida Estampado/ Varon T.3	15100.00	15981.84	1638.35	2025-03-10	\N	
95	1090	13	Media Caña Surtida Estampado/ Varon T.4	17378.00	18392.88	1885.51	2025-03-10	\N	
96	1090-5	13	Media Caña Surtida Estampado/ Varon T.5	17950.00	18998.28	1947.58	2025-03-10	\N	
103	150-Discon	13	Media WOW 1/3 Caña Dama Toalla en Planta	15357.00	16253.85	1666.23	2024-07-22	\N	
104	1011	13	Media Caña BEBE Estampado T.0-1 	9194.00	9730.93	997.55	2025-03-10	\N	
105	401R	13	1/3 Caña Morley Dama Estamp/Liso Surt/Rayada	17441.00	18459.55	1892.35	2024-12-27	\N	
106	402R	13	1/3 Caña Morley Hombre Estamp/Liso Surt/Rayada	19687.00	20836.72	2136.04	2024-12-27	\N	
107	1422	28	Soquete Hombre ANTIDESLIZANTE Alg.Liso Surt.	15840.00	20592.00	2019.60	2025-04-25	\N	
108	MJ-18	28	Soquete Dama ANTIDESLIZANTE Alg.Liso Surt.	16200.00	21060.00	2065.50	2025-04-25	\N	
109	MJ-20	28	Media Casual Dama 1/3 Caña Puño Morley Estampado	14400.00	15966.72	1636.80	2025-06-09	\N	
110	1425	28	Media Casual Hombre 1/3 Caña Puño Morley Estampado	17640.00	19559.23	2005.08	2025-06-09	\N	
\.


--
-- Data for Name: niveles; Type: TABLE DATA; Schema: proyecto; Owner: postgres
--

COPY proyecto.niveles (id, nivel) FROM stdin;
1	Planta Baja
2	Primer Piso
4	Primer Rampa
5	Segunda Rampa
3	Segundo Piso
\.


--
-- Data for Name: productos; Type: TABLE DATA; Schema: proyecto; Owner: postgres
--

COPY proyecto.productos (id, cod_art, id_prov, descripcion, precio_doc, precio_oferta, costo, fecha_alta, fecha_baja, imagen, stock, is_on_offer, category) FROM stdin;
6	600/P	8	Vedetina Especial Dama Alg.Lycra	18538.00	1818.15	14260.00	2024-09-30	\N	1724254716_univBomMxM.png	0	f	femInterior
7	25	1	Bombacha Señora Embut.T.6 Extra Grande	17940.00	1782.50	13800.00	2024-07-05	\N	woman.jpg	\N	f	femInterior
8	24	1	Bombacha Señora Embut.T.5 Extra Grande	17030.00	1692.08	13100.00	2024-07-05	\N		\N	f	femInterior
9	27	1	Bombacha Señora Embut.Alg.Estamp T.1 al 4	15470.00	1537.08	11900.00	2024-07-05	\N		\N	f	femInterior
10	27-0	1	Bombacha Señora Embut.Alg.Estampada T.0 	7800.00	775.00	6000.00	2024-07-05	\N		\N	f	femInterior
11	27-TC	1	Bombacha Tiro Corto Alg.Estampada	13390.00	1330.42	10300.00	2024-07-05	\N		\N	f	femInterior
12	112-DISCON	19	Colaless Dama Alg.L M y L / Idem Culot Less	13000.00	1291.67	10000.00	2024-08-13	\N		\N	f	femInterior
13	113-DISCON	19	Vedetina Dama Alg.L M y L	13650.00	1356.25	10500.00	2024-08-13	\N		\N	f	femInterior
14	104	7	Colaless Dama Alg.Lyc.Estamp. Varios	11154.00	1108.25	8580.00	2024-07-05	\N		\N	f	femInterior
15	401	7	Boxer Juvenil Alg.Lyc. Estamp. Varios	19305.00	1918.13	14850.00	2024-07-05	\N		\N	f	femInterior
16	800	2	Culote Dama Manos Esp.Alg.Lycra (y ROSA)	32500.00	3229.17	25000.00	2024-07-05	\N		\N	f	femInterior
17	5214/34	20	Culote Dama Vedetina Alg.L Cint.Puntilla S/STOCK	4300.00	500.00	\N	2023-05-24	\N		\N	f	femInterior
18	650	2	Culote Dama Patitas Alg.L (y ROSA)	9500.00	900.00	\N	2023-05-24	\N		\N	f	femInterior
19	705	2	Boxer Dama Especial Alg.L (y ROSA)	11200.00	1100.00	\N	2023-05-24	\N	\N	\N	f	femInterior
21	48	10	Tiro Corto Dama M Alg.Lycra Liso	12090.00	1185.75	9300.00	2024-09-19	\N		\N	f	femInterior
22	8053NEU	21	Bombachas lycra del L al XXXL	6800.00	750.00	\N	2023-02-03	\N	\N	\N	f	femInterior
23	K721	21	Bombacha Dama Microfibra (L-XL) (XXL-XXXL)	19.00	1200.00	\N	2023-05-24	\N	\N	\N	f	femInterior
24	230/1511	21	Vedetinas Microfibra Varios Talles	6000.00	750.00	\N	2023-02-03	\N	\N	\N	f	femInterior
25	2315	21	Vedetina c/Encaje del L al XXL	6000.00	750.00	\N	2023-02-03	\N	\N	\N	f	femInterior
26	3001L	21	Culote encaje [TODOS LOS MODELOS]	6100.00	750.00	\N	2023-02-24	\N	\N	\N	f	femInterior
27	A0410	21	Vedetina Faja Microfibra del M al XL	8500.00	800.00	\N	2023-02-24	\N	\N	\N	f	femInterior
28	020	22	Conjunto Dama Desagujado Arm.Less Aro	15100.00	1500.00	\N	2023-05-24	\N		\N	f	femInterior
29	08	22	Conjunto Dama Triang.Alg Picot Less S/Aro	12750.00	1250.00	\N	2023-05-24	\N	\N	\N	f	femInterior
30	010	22	Conjunto Dama Triang.Alg Puntilla Less S/Aro	12750.00	1250.00	\N	2023-05-24	\N		\N	f	femInterior
31	07	22	Comjunto Dama Triang Victoria/Tomy/Calvin S/Aro	13500.00	1250.00	\N	2023-05-24	\N		\N	f	femInterior
32	23	1	Bombacha Nena Embut.Alg.Estamp t.0 al 4	3900.00	475.00	\N	2023-05-24	\N		\N	f	femInterior
33	24	1	Bombacha Nena Embut.Alg.Estamp T.5	4500.00	500.00	\N	2023-05-24	\N		\N	f	femInterior
34	22	4	Culote Nena Alg.L Estamp T.2-4	4680.00	465.00	3600.00	2023-06-27	\N		\N	f	femInterior
35	620	7	Bombacha Nena Alg.L.Estamp.Faja T.1-2-3	5000.00	500.00	\N	2023-05-24	\N		\N	f	femInterior
36	630	7	Culote Nena Alg.L.Estamp Faja T.4	6100.00	600.00	\N	2023-05-24	\N		\N	f	femInterior
37	650	7	Bombacha Nena Alg.L.Estamp T.4	6100.00	600.00	\N	2023-05-24	\N		\N	f	femInterior
38	55	3	Conjunto Nena Bretel Alg.L T.Unico	6700.00	900.00	\N	2023-05-24	\N		\N	f	femInterior
39	83	3	Conjunto Nena Bretel Alg.L C/Push T.Unico	8100.00	900.00	\N	2023-05-24	\N		\N	f	femInterior
40	88	3	Conjunto Nena Deportivo Alg.L C/Push T.Unico	9500.00	1000.00	\N	2023-05-24	\N		\N	f	femInterior
41	31	4	Super Especial Dama Alg.L Lisa	7200.00	1050.00	\N	2023-05-24	\N	\N	\N	f	femInterior
42	032	22	Conjunto Dama Versalles/Tomy/Calvin Arm.Less Aro	16150.00	1500.00	\N	2023-05-24	\N	\N	\N	f	femInterior
43	47	10	Vedetina Dama L Alg.Lycra Lisas	13910.00	1364.25	10700.00	2024-09-19	\N		\N	f	femInterior
44	46	10	Vedetina Dama M Alg.Lycra Lisas	10790.00	1058.25	8300.00	2024-09-19	\N		\N	f	femInterior
45	45	10	Colaless Dama S Alg.Lycra Lisas	8710.00	854.25	6700.00	2024-09-19	\N		\N	f	femInterior
64	740/3	13	Termica Chicos Extra Alg.Lycra Surtido T.3	\N	\N	27500.00	2025-03-10	\N		12	f	medias
65	750	13	Termica Juvenil Extra Alg.Lycra Surtido T.4	32121.38	3292.87	30349.00	2025-03-10	\N		30349	f	medias
66	022/023	13	Invisible Dama Estamp-Liso B/N	14072.49	1442.62	13296.00	2025-03-10	\N	1724268530_invElem023e.png	13296	t	medias
67	101	13	Soquete Dama Estamp/Deportiva/Lisa Surt/B/N 	15426.18	1581.39	14575.00	2025-03-10	\N		14575	f	medias
68	551	13	Soquete Dama Soft c.Lengueta Toalla planta	17283.67	1771.81	16330.00	2025-03-10	\N		16330	f	medias
69	200/201/20	13	Media Caña Dama Rayada/Lisa Surt/Estamp/B/N	20404.89	2091.77	19279.00	2025-03-10	\N		19279	f	medias
70	203-SIN ST	13	Media 3/4 Dama Lisa surtida/Negra	23291.15	2387.65	22006.00	2024-10-07	\N		22006	f	medias
71	720	13	Termica 3/4 Dama Extra Alg.Lycra Surtida	37274.73	3821.15	35218.00	2025-03-10	\N		35218	f	medias
72	011	13	Invisible Alta Hombre Surt.Liso/ByN/Negro	15720.42	1611.55	14853.00	2025-03-10	\N		14853	f	medias
73	012/013	13	Invisible Alta Hombre Clasico Surt./Urbano	15720.42	1611.55	14853.00	2025-03-10	\N		14853	f	medias
75	501	13	Soquete Soft Hombre c.Lengueta Toalla Planta	19350.73	1983.71	18283.00	2025-03-10	\N		18283	f	medias
77	953D-L	13	Soquete Alto Hombre FIT Deportivo-Liso	20901.28	2142.66	19748.00	2025-03-10	\N		19748	f	medias
78	730	13	Termico 3/4 Hombre Extra Alg.Lycra Surtida	41180.23	4221.52	38908.00	2025-03-10	\N		38908	f	medias
79	333	14	Media Hombre Termica Estampada	40604.20	3982.34	31234.00	2025-02-07	\N		31234	f	medias
80	9020	14	Media Hombre Deportivo Toalla Liso B/N	16598.40	1649.20	12768.00	2024-08-08	\N		12768	f	medias
81	1010/1012	14	Soquete Hombre Estampado/Liso B-N	14794.00	1450.95	11380.00	2025-02-07	\N		11380	f	medias
20	49	10	Tiro Corto Dama L Alg.Lycra Liso	14300.00	1402.50	11000.00	2024-09-19	\N	dama0923ps.png	\N	t	femInterior
2	600-DISCON	8	Bombacha Universal Dama Alg.Lycra Lisa	16770.00	1644.75	12900.00	2024-08-13	\N	culote_BYH_2016.jpg	0	f	femInterior
3	07/P	8	Bombacha Ultra Especial Alg.Lycra Elastico Coronita Lisas	52000.00	5100.00	40000.00	2024-09-30	\N	1724254209_especBomMxM.png	0	t	femInterior
82	666	14	Media Dama Termica Estampada 	37876.80	3714.84	29136.00	2025-02-07	\N		29136	f	medias
83	6020	14	Media Dama Deportivo Toalla B/N	18011.50	1766.51	13855.00	2025-02-07	\N		13855	f	medias
84	4010/4012	14	Soquete Dama Alg.Estampada/Lisa B-N	13695.50	1343.21	10535.00	2025-02-07	\N		10535	f	medias
85	505	25	Medias Hombre Alg.Liso Surtido Color	14599.00	1450.54	11230.00	2024-09-18	\N		11230	f	medias
86	2000	26	Medias Tubo TOALLA VARIOS COLORES	2500.00	300.00	\N	2023-05-01	\N		\N	f	medias
87	1002	24	Pantymedia Multifilam.Dama T.1 al 4 Color 32/34/Negro	17420.00	1708.50	13400.00	2024-09-18	\N		13400	f	medias
88	1053	24	Pantymedia Multifil Dama T.5 Color 32/Negro	20540.00	2014.50	15800.00	2024-09-18	\N		15800	f	medias
89	420	24	Medias 3/4 Multifilam.Dama 2 Pares Color 32/N	16380.00	1606.50	12600.00	2024-09-18	\N		12600	f	medias
90	102	27	Media Red C/puntilla silicona (blanco ,negro, rojo)	9200.00	1100.00	\N	2023-03-01	\N		\N	f	medias
91	101	27	Media Lycra C/puntilla Silicona (Negro y Rojo)	9200.00	1100.00	\N	2023-03-01	\N		\N	f	medias
92	112	27	Media de Red C/ puntilla Ancha colores (Rojo y Negro)	9200.00	1100.00	\N	2023-03-01	\N		\N	f	medias
93	111	27	Media Lycra C/puntilla Ancha colores (Negro,Rojo)	9200.00	1100.00	\N	2023-03-01	\N		\N	f	medias
94	402	27	Panty Portaliga Red colores (Negro y Rojo)	14500.00	1100.00	\N	2023-03-01	\N		\N	f	medias
95	401	27	Panty Portaliga Lisa colores (Negro y Rojo)	14500.00	1100.00	\N	2023-03-01	\N		\N	f	medias
96	202	27	Panty Medias Red (Blanco,Negro,Rojo y Natural)	9500.00	1100.00	\N	2023-03-01	\N		\N	f	medias
97	205	27	Portaliga C/Puntilla Colores ( Blanco,Negro y Rojo)	11500.00	1100.00	\N	2023-03-01	\N		\N	f	medias
98	31	27	Media 7/8 Lycra  Colores surt-Negro	7200.00	800.00	\N	2023-03-01	\N		\N	f	medias
99	740	13	Térmica Extra Alg/Lycra Surtidas Chicos T.2	27941.76	2864.40	26400.00	2025-03-10	\N		26400	f	medias
100	104	13	Soquete Chicos Blanco/Azul/Estampado Surt. T.1	11666.74	1196.00	11023.00	2025-03-10	\N		11023	f	medias
101	104	13	Soquete Blanco/Azul/Estampado Surt./ Varon T.2	12660.58	1297.88	11962.00	2025-03-10	\N		11962	f	medias
102	105	13	Soquete Juvenil Blanco/Azul/Estampado Surt. T.4	14256.65	1461.50	13470.00	2025-03-10	\N		13470	f	medias
103	104-3	13	Soquete Chicos Blanco/Azul/Estampado Surt. T.3	13759.20	1410.50	13000.00	2025-03-10	\N		13000	f	medias
104	105	13	Soquete Juvenil Blanco/Azul/Estampado Surt.T.5	15240.96	1562.40	14400.00	2025-03-10	\N		14400	f	medias
105	1020	13	Media Caña Chicos Surtida Estampado/Varon T.0	12912.48	1323.70	12200.00	2025-03-10	\N		12200	f	medias
106	1020-1	13	Media Caña Surtida Estampado/Varon T.1	13439.56	1377.73	12698.00	2025-03-10	\N		12698	f	medias
107	1020	13	Media Caña Surtida Estampado/ Varon T.2	15237.78	1562.07	14397.00	2025-03-10	\N		14397	f	medias
108	1020-3	13	Media Caña Surtida Estampado/ Varon T.3	15981.84	1638.35	15100.00	2025-03-10	\N		15100	f	medias
109	1090	13	Media Caña Surtida Estampado/ Varon T.4	18392.88	1885.51	17378.00	2025-03-10	\N		17378	f	medias
110	1090-5	13	Media Caña Surtida Estampado/ Varon T.5	18998.28	1947.58	17950.00	2025-03-10	\N		17950	f	medias
111	150-Discon	13	Media WOW 1/3 Caña Dama Toalla en Planta	16253.85	1666.23	15357.00	2024-07-22	\N		15357	f	medias
112	1011	13	Media Caña BEBE Estampado T.0-1 	9730.93	997.55	9194.00	2025-03-10	\N		9194	f	medias
113	401R	13	1/3 Caña Morley Dama Estamp/Liso Surt/Rayada	18459.55	1892.35	17441.00	2024-12-27	\N		17441	f	medias
114	402R	13	1/3 Caña Morley Hombre Estamp/Liso Surt/Rayada	20836.72	2136.04	19687.00	2024-12-27	\N		19687	f	medias
115	1422	28	Soquete Hombre ANTIDESLIZANTE Alg.Liso Surt.	20592.00	2019.60	15840.00	2025-04-25	\N		15840	f	medias
116	MJ-18	28	Soquete Dama ANTIDESLIZANTE Alg.Liso Surt.	21060.00	2065.50	16200.00	2025-04-25	\N		16200	f	medias
117	MJ-20	28	Media Casual Dama 1/3 Caña Puño Morley Estampado	15966.72	1636.80	14400.00	2025-06-09	\N		14400	f	medias
118	1425	28	Media Casual Hombre 1/3 Caña Puño Morley Estampado	19559.23	2005.08	17640.00	2025-06-09	\N		17640	f	medias
127	12062	15	BOXER ALGODON RAYAS ANCHAS SIN COSTURA	40349.40	4009.08	31038.00	2024-09-18	\N		31038	f	masculinos
128	12050	15	BOXER ALGODON LISO SIN COSTURA	40964.30	4070.17	31511.00	2024-09-18	\N		31511	f	masculinos
129	12056	15	BOXER ALGODON LABRADO SIN COSTURA	40349.40	4009.08	31038.00	2024-09-18	\N		31038	f	masculinos
130	501	6	BOXER HOMBRE SIN COSTURA LISO-S al XL	35100.00	3442.50	27000.00	2025-02-26	\N		27000	f	masculinos
131	501	6	BOXER HOMBRE SIN COSTURA LISO-XXL	36972.00	3626.10	28440.00	2025-02-26	\N		28440	f	masculinos
132	520	6	BOXER HOMBRE SIN COSTURA RAYADO -S al XL	36192.00	3549.60	27840.00	2025-02-26	\N		27840	f	masculinos
133	520	6	BOXER HOMBRE SIN COSTURA RAYADO- XXL	37596.00	3687.30	28920.00	2025-02-26	\N	1724269669_boxBarack520.png	28	t	masculinos
134	77	12	BOXER ADULTO Elast.Anc.Alg/L Rayado/Liso t.3 al 6	19500.00	1937.50	15000.00	2024-08-12	\N		15000	f	masculinos
135	3900	16	Boxer Clásico Alg.Lycra Elast.en Relieve a Tono PIERNA CORTA- S al XXL	60571.93	5824.22	4536.00	2025-02-26	\N		4536	f	masculinos
136	3200B	16	Boxer Clásico Elast.Ancho Alg.Lycra PIERNA MEDIA- 3XL al 5XL	72990.78	7018.34	5466.00	2025-02-26	\N		5466	f	masculinos
137	3207-38	16	Boxer Alg.Lycra Elast.Ancho Estamp. VARIOS- S al XXL	70346.76	6764.11	5268.00	2025-02-26	\N		5268	f	masculinos
138	3030B	16	Boxer Elast.Ancho Alg.Lycra ESTAMPADOS SURTIDOS- 3XL al 5XL	77117.04	7415.10	5775.00	2025-02-26	\N		5775	f	masculinos
139	3200	16	Boxer Clásico Elast.Ancho Alg.Lycra PIERNA MEDIA- S al XXL	60571.93	5824.22	4536.00	2025-02-26	\N		4536	f	masculinos
140	CP7018(19)	21	Boxer Hombre Seda Fria ESTAMP.SURTIDOS- L al XXXL	34710.00	3448.75	26700.00	2024-08-12	\N		26700	f	masculinos
141	CP7200(20)	21	Slips Hombre Elast.Ancho Alg/Lycra- L al XXXL	36530.00	3629.58	28100.00	2024-08-12	\N		28100	f	masculinos
142	CP7700(21)	21	Slips Hombre Elast.Ancho Alg/L Especial- 4XL al 6XL	38350.00	3810.42	29500.00	2024-08-12	\N		29500	f	masculinos
143	99	5	Slips Hombre Alg.Jersey Embutido Liso T.2 al 5	14170.00	1389.75	10900.00	2024-09-19	\N		10900	f	masculinos
144	100	5	Slips Hombre Triple Cost.Alg.Jersey Liso T.2 al 5	15600.00	1530.00	12000.00	2024-09-19	\N		12000	f	masculinos
145	101	5	Slips Hombre Triple Cost.Especial Alg.Jersey Liso T.7-8	20150.00	1976.25	15500.00	2024-09-19	\N		15500	f	masculinos
146	102	5	Slips Niño Embut.Alg.Jersey Estamp. T.1 al 4	10530.00	1032.75	8100.00	2024-09-19	\N		8100	f	masculinos
147	12058	15	Boxer Hombre C/Elastico Alg.Lycra Liso	52910.00	5257.08	40700.00	2024-07-05	\N		40700	f	masculinos
158	800	17	Camison Dama Manga Corta Alg.Jersey Estampado T.46 al 60	9750.00	12000.00	7800.00	2024-09-16	\N	1705606466_camMangaCorta.jpg	7	t	camisonetas
159	801	17	Camison Dama M.Larga Alg.Jersey T.46 al 60	10000.00	10400.00	8000.00	2024-08-13	\N	1723562444_1706037845_camMLarga.jpg	8	t	camisonetas
160	802	17	Camison Dama Musculosa Alg.Jersey T.46 al 60	9750.00	10140.00	7800.00	2024-09-16	\N	1723562274_1705606406_camMusculosa.jpeg	7	t	camisonetas
161	803	17	Pijama Dama M.Larga Invierno T.1 al 8	15250.00	15860.00	12200.00	2024-09-16	\N	woman2.jpg	12	t	camisonetas
162	804	17	Pijama Niño/Juvenil M.Larga Invierno T.1 al 14	10000.00	10400.00	8000.00	2024-08-13	\N		8000	f	camisonetas
163	805	17	Pijama Hombre M.Larga Invierno T.1 al 6	15250.00	15860.00	12200.00	2024-09-16	\N	men.jpg	12	t	camisonetas
164	806	17	Pijama Dama Manga Larga Alg.Estamp.T.1 al 6	12750.00	13260.00	10200.00	2024-09-16	\N		10200	f	camisonetas
165	022/023	66	Invisible Dama Estamp-Liso B/N	16221.12	1717.40	13296.00	\N	\N		\N	f	
166	740/3	77	Termica Chicos Extra Alg.Lycra Surtido T.3	33550.00	3552.08	27500.00	\N	\N		\N	f	
176	600-DISCON	11	Bombacha Universal Dama Alg.Lycra Lisa	16770.00	1666.25	12900.00	\N	\N	culote_BYH_2016.jpg	\N	t	
181	1001	3	Corpiño	16250.00	1593.75	12500.00	2025-12-04	\N	coffee.jpg	\N	t	femInterior
5	112/P	8	Bombacha Universal Dama Alg.Lycra Clasica Lisas	29000.00	2727.23	21390.00	2024-09-30	\N	chica_ps.png	0	t	femInterior
177	600-DISCON	\N	Bombacha Universal Dama Alg.Lycra Lisa	16770.00	1666.25	12900.00	\N	\N	dama0923ps.png	\N	f	
180	7000	29	CAMISETA HOMBRE TERMICA	16250.00	16900.00	13000.00	\N	\N	Cami-termica-blanca.png	\N	t	camisonetas
1	113	4	Bombacha Señora Faja Alg.Lycra Lisa	26000.00	2550.00	20000.00	2025-12-04	\N	1724254209_especBomMxM.png	0	t	femInterior
\.


--
-- Data for Name: variaciones; Type: TABLE DATA; Schema: proyecto; Owner: postgres
--

COPY proyecto.variaciones (id, producto_id, color, talla, stock) FROM stdin;
13	6	Negro	3	12
14	6	Blanco	3	12
3548837	180	Blanca	S	12
3548838	180	Blanca	L	11
3548829	3	Azul	Unico	12
3548831	3	Rosa	Unico	12
3548830	3	Blanco	Unico	9
3548846	1	Rosa	Unico	20
3548563	5	\N	\N	\N
3548564	5	\N	\N	\N
3548565	5	\N	\N	\N
3548566	5	\N	\N	\N
3548567	5	\N	\N	\N
3548568	5	\N	\N	\N
3548569	5	\N	\N	\N
3548570	5	\N	\N	\N
3548571	5	\N	\N	\N
3548572	5	\N	\N	\N
3548573	5	\N	\N	\N
3548574	5	\N	\N	\N
3548575	5	\N	\N	\N
3548576	5	\N	\N	\N
3548577	5	\N	\N	\N
3548578	5	\N	\N	\N
3548579	5	\N	\N	\N
3548580	5	\N	\N	\N
3548581	5	\N	\N	\N
3548582	5	\N	\N	\N
3548583	5	\N	\N	\N
3548584	5	\N	\N	\N
3548585	5	\N	\N	\N
3548586	5	\N	\N	\N
3548587	5	\N	\N	\N
3548588	5	\N	\N	\N
3548589	5	\N	\N	\N
3548590	5	\N	\N	\N
3548591	5	\N	\N	\N
3548592	5	\N	\N	\N
3548593	5	\N	\N	\N
3548594	5	\N	\N	\N
3548595	5	\N	\N	\N
3548596	5	\N	\N	\N
3548597	5	\N	\N	\N
3548598	5	\N	\N	\N
3548599	5	\N	\N	\N
3548600	5	\N	\N	\N
3548601	5	\N	\N	\N
3548602	5	\N	\N	\N
3548603	5	\N	\N	\N
3548604	5	\N	\N	\N
3548605	5	\N	\N	\N
3548606	5	\N	\N	\N
3548607	5	\N	\N	\N
3548608	5	\N	\N	\N
3548609	5	\N	\N	\N
3548610	5	\N	\N	\N
3548611	5	\N	\N	\N
3548612	5	\N	\N	\N
3548613	5	\N	\N	\N
3548614	5	\N	\N	\N
3548615	5	\N	\N	\N
3548616	5	\N	\N	\N
3548617	5	\N	\N	\N
3548618	5	\N	\N	\N
3548619	5	\N	\N	\N
3548620	5	\N	\N	\N
3548621	5	\N	\N	\N
3548622	5	\N	\N	\N
3548623	5	\N	\N	\N
3548624	5	\N	\N	\N
3548625	5	\N	\N	\N
3548626	5	\N	\N	\N
3548627	5	\N	\N	\N
3548628	5	\N	\N	\N
3548629	5	\N	\N	\N
3548630	5	\N	\N	\N
3548631	5	\N	\N	\N
3548632	5	\N	\N	\N
3548633	5	\N	\N	\N
3548634	5	\N	\N	\N
3548635	5	\N	\N	\N
3548636	5	\N	\N	\N
3548637	5	\N	\N	\N
3548638	5	\N	\N	\N
3548639	5	\N	\N	\N
3548640	5	\N	\N	\N
3548641	5	\N	\N	\N
3548642	5	\N	\N	\N
3548643	5	\N	\N	\N
3548644	5	\N	\N	\N
3548645	5	\N	\N	\N
3548646	5	\N	\N	\N
3548647	5	\N	\N	\N
3548648	5	\N	\N	\N
3548649	5	\N	\N	\N
3548650	5	\N	\N	\N
3548651	5	\N	\N	\N
3548652	5	\N	\N	\N
3548653	5	\N	\N	\N
3548654	5	\N	\N	\N
3548655	5	\N	\N	\N
3548656	5	\N	\N	\N
3548657	5	\N	\N	\N
3548658	5	\N	\N	\N
3548659	5	\N	\N	\N
3548660	5	\N	\N	\N
3548661	5	\N	\N	\N
3548662	5	\N	\N	\N
3548663	5	\N	\N	\N
3548664	5	\N	\N	\N
3548665	5	\N	\N	\N
3548666	5	\N	\N	\N
3548667	5	\N	\N	\N
3548668	5	\N	\N	\N
3548669	5	\N	\N	\N
3548670	5	\N	\N	\N
3548671	5	\N	\N	\N
3548672	5	\N	\N	\N
3548673	5	\N	\N	\N
3548674	5	\N	\N	\N
3548675	5	\N	\N	\N
3548676	5	\N	\N	\N
3548677	5	\N	\N	\N
3548678	5	\N	\N	\N
3548679	5	\N	\N	\N
3548680	5	\N	\N	\N
3548681	5	\N	\N	\N
3548682	5	\N	\N	\N
3548683	5	\N	\N	\N
3548684	5	\N	\N	\N
3548685	5	\N	\N	\N
3548686	5	\N	\N	\N
3548687	5	\N	\N	\N
3548688	5	\N	\N	\N
3548689	5	\N	\N	\N
3548690	5	\N	\N	\N
3548691	5	\N	\N	\N
3548692	5	\N	\N	\N
3548693	5	\N	\N	\N
3548694	5	\N	\N	\N
3548695	5	\N	\N	\N
3548696	5	\N	\N	\N
3548697	5	\N	\N	\N
3548698	5	\N	\N	\N
3548699	5	\N	\N	\N
3548700	5	\N	\N	\N
3548701	5	\N	\N	\N
3548702	5	\N	\N	\N
3548703	5	\N	\N	\N
3548704	5	\N	\N	\N
3548705	5	\N	\N	\N
3548706	5	\N	\N	\N
3548707	5	\N	\N	\N
3548708	5	\N	\N	\N
3548709	5	\N	\N	\N
3548710	5	\N	\N	\N
3548711	5	\N	\N	\N
3548712	5	\N	\N	\N
3548713	5	\N	\N	\N
3548714	5	\N	\N	\N
3548715	5	\N	\N	\N
3548716	5	\N	\N	\N
3548717	5	\N	\N	\N
3548718	5	\N	\N	\N
3548719	5	\N	\N	\N
3548720	5	\N	\N	\N
3548721	5	\N	\N	\N
3548722	5	\N	\N	\N
3548723	5	\N	\N	\N
3548724	5	\N	\N	\N
3548725	5	\N	\N	\N
3548726	5	\N	\N	\N
3548727	5	\N	\N	\N
3548728	5	\N	\N	\N
3548729	5	\N	\N	\N
3548730	5	\N	\N	\N
3548731	5	\N	\N	\N
3548732	5	\N	\N	\N
3548733	5	\N	\N	\N
3548734	5	\N	\N	\N
3548735	5	\N	\N	\N
3548736	5	\N	\N	\N
3548737	5	\N	\N	\N
3548738	5	\N	\N	\N
3548739	5	\N	\N	\N
3548740	5	\N	\N	\N
3548741	5	\N	\N	\N
3548742	5	\N	\N	\N
3548743	5	\N	\N	\N
3548744	5	\N	\N	\N
3548745	5	\N	\N	\N
3548746	5	\N	\N	\N
3548747	5	\N	\N	\N
3548748	5	\N	\N	\N
3548749	5	\N	\N	\N
3548750	5	\N	\N	\N
3548751	5	\N	\N	\N
3548752	5	\N	\N	\N
3548753	5	\N	\N	\N
3548754	5	\N	\N	\N
3548755	5	\N	\N	\N
3548756	5	\N	\N	\N
3548757	5	\N	\N	\N
3548758	5	\N	\N	\N
3548759	5	\N	\N	\N
3548760	5	\N	\N	\N
3548761	5	\N	\N	\N
3548762	5	\N	\N	\N
3548763	5	\N	\N	\N
3548764	5	\N	\N	\N
3548765	5	\N	\N	\N
3548766	5	\N	\N	\N
3548767	5	\N	\N	\N
3548768	5	\N	\N	\N
3548769	5	\N	\N	\N
3548770	5	\N	\N	\N
3548771	5	\N	\N	\N
3548772	5	\N	\N	\N
3548773	5	\N	\N	\N
3548774	5	\N	\N	\N
3548775	5	\N	\N	\N
3548776	5	\N	\N	\N
3548777	5	\N	\N	\N
3548778	5	\N	\N	\N
3548779	5	\N	\N	\N
3548780	5	\N	\N	\N
3548781	5	\N	\N	\N
\.


--
-- Name: camisonetas_id_seq; Type: SEQUENCE SET; Schema: proyecto; Owner: postgres
--

SELECT pg_catalog.setval('proyecto.camisonetas_id_seq', 7, true);


--
-- Name: fabricants_id_seq; Type: SEQUENCE SET; Schema: proyecto; Owner: postgres
--

SELECT pg_catalog.setval('proyecto.fabricants_id_seq', 29, true);


--
-- Name: femeninterior_id_seq; Type: SEQUENCE SET; Schema: proyecto; Owner: postgres
--

SELECT pg_catalog.setval('proyecto.femeninterior_id_seq', 194, true);


--
-- Name: locales_id_seq; Type: SEQUENCE SET; Schema: proyecto; Owner: postgres
--

SELECT pg_catalog.setval('proyecto.locales_id_seq', 6, true);


--
-- Name: masculinos_id_seq; Type: SEQUENCE SET; Schema: proyecto; Owner: postgres
--

SELECT pg_catalog.setval('proyecto.masculinos_id_seq', 24, true);


--
-- Name: medias_id_seq; Type: SEQUENCE SET; Schema: proyecto; Owner: postgres
--

SELECT pg_catalog.setval('proyecto.medias_id_seq', 110, true);


--
-- Name: productos_id_seq; Type: SEQUENCE SET; Schema: proyecto; Owner: postgres
--

SELECT pg_catalog.setval('proyecto.productos_id_seq', 181, true);


--
-- Name: variaciones_id_seq; Type: SEQUENCE SET; Schema: proyecto; Owner: postgres
--

SELECT pg_catalog.setval('proyecto.variaciones_id_seq', 3548846, true);


--
-- Name: camisonetas idx_24732_primary; Type: CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.camisonetas
    ADD CONSTRAINT idx_24732_primary PRIMARY KEY (id);


--
-- Name: fabricants idx_24747_primary; Type: CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.fabricants
    ADD CONSTRAINT idx_24747_primary PRIMARY KEY (id);


--
-- Name: femeninterior idx_24755_primary; Type: CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.femeninterior
    ADD CONSTRAINT idx_24755_primary PRIMARY KEY (id);


--
-- Name: locales idx_24770_primary; Type: CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.locales
    ADD CONSTRAINT idx_24770_primary PRIMARY KEY (id);


--
-- Name: masculinos idx_24785_primary; Type: CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.masculinos
    ADD CONSTRAINT idx_24785_primary PRIMARY KEY (id);


--
-- Name: medias idx_24800_primary; Type: CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.medias
    ADD CONSTRAINT idx_24800_primary PRIMARY KEY (id);


--
-- Name: productos idx_24820_primary; Type: CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.productos
    ADD CONSTRAINT idx_24820_primary PRIMARY KEY (id);


--
-- Name: variaciones idx_24835_primary; Type: CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.variaciones
    ADD CONSTRAINT idx_24835_primary PRIMARY KEY (id);


--
-- Name: idx_24732_fk_medias_proveedores; Type: INDEX; Schema: proyecto; Owner: postgres
--

CREATE INDEX idx_24732_fk_medias_proveedores ON proyecto.camisonetas USING btree (id_prov);


--
-- Name: idx_24755_id_prov; Type: INDEX; Schema: proyecto; Owner: postgres
--

CREATE INDEX idx_24755_id_prov ON proyecto.femeninterior USING btree (id_prov);


--
-- Name: idx_24785_fk_medias_proveedores; Type: INDEX; Schema: proyecto; Owner: postgres
--

CREATE INDEX idx_24785_fk_medias_proveedores ON proyecto.masculinos USING btree (id_prov);


--
-- Name: idx_24800_fk_medias_proveedores; Type: INDEX; Schema: proyecto; Owner: postgres
--

CREATE INDEX idx_24800_fk_medias_proveedores ON proyecto.medias USING btree (id_prov);


--
-- Name: idx_24835_producto_id; Type: INDEX; Schema: proyecto; Owner: postgres
--

CREATE INDEX idx_24835_producto_id ON proyecto.variaciones USING btree (producto_id);


--
-- Name: femeninterior femen_fk; Type: FK CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.femeninterior
    ADD CONSTRAINT femen_fk FOREIGN KEY (id_prov) REFERENCES proyecto.fabricants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: medias fk_medias_proveedores; Type: FK CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.medias
    ADD CONSTRAINT fk_medias_proveedores FOREIGN KEY (id_prov) REFERENCES proyecto.fabricants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: variaciones variaciones_ibfk_1; Type: FK CONSTRAINT; Schema: proyecto; Owner: postgres
--

ALTER TABLE ONLY proyecto.variaciones
    ADD CONSTRAINT variaciones_ibfk_1 FOREIGN KEY (producto_id) REFERENCES proyecto.productos(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict eFyubredJ2SPJfajaOahZFdNZDR2RdI44h5OFgw4QEJgckeMUF1pyxxXoHRvkHk

