PGDMP      8                }            thaiboxinghub    17.4    17.4 7    W           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            X           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            Y           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            Z           1262    40644    thaiboxinghub    DATABASE     �   CREATE DATABASE thaiboxinghub WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE thaiboxinghub;
                     postgres    false            �            1259    40687    Booking    TABLE     �  CREATE TABLE public."Booking" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "eventId" text NOT NULL,
    "totalAmount" double precision NOT NULL,
    "paymentStatus" public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Booking";
       public         heap r       postgres    false            �            1259    40694    Event    TABLE       CREATE TABLE public."Event" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    date timestamp(3) without time zone NOT NULL,
    "startTime" timestamp(3) without time zone NOT NULL,
    "endTime" timestamp(3) without time zone NOT NULL,
    "imageUrl" text,
    "usesDefaultPoster" boolean DEFAULT true NOT NULL,
    "venueId" text NOT NULL,
    "regionId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Event";
       public         heap r       postgres    false            �            1259    40701    EventDetail    TABLE     �  CREATE TABLE public."EventDetail" (
    id text NOT NULL,
    "eventId" text NOT NULL,
    "seatType" text NOT NULL,
    price double precision NOT NULL,
    capacity integer NOT NULL,
    description text,
    "soldCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
 !   DROP TABLE public."EventDetail";
       public         heap r       postgres    false            �            1259    40708    Fight    TABLE       CREATE TABLE public."Fight" (
    id text NOT NULL,
    "eventId" text NOT NULL,
    "redFighterId" text NOT NULL,
    "blueFighterId" text NOT NULL,
    "weightClass" text NOT NULL,
    rounds integer DEFAULT 5 NOT NULL,
    "order" integer DEFAULT 1 NOT NULL,
    status public."FightStatus" DEFAULT 'SCHEDULED'::public."FightStatus" NOT NULL,
    winner public."FightCorner",
    method text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Fight";
       public         heap r       postgres    false            �            1259    40717    Fighter    TABLE     Z  CREATE TABLE public."Fighter" (
    id text NOT NULL,
    name text NOT NULL,
    nickname text,
    "weightClass" text NOT NULL,
    record text NOT NULL,
    "imageUrl" text,
    country text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Fighter";
       public         heap r       postgres    false            �            1259    40723    Region    TABLE     e   CREATE TABLE public."Region" (
    id text NOT NULL,
    name text NOT NULL,
    description text
);
    DROP TABLE public."Region";
       public         heap r       postgres    false            �            1259    40728    Ticket    TABLE     �  CREATE TABLE public."Ticket" (
    id text NOT NULL,
    "eventId" text NOT NULL,
    "ticketTypeId" text NOT NULL,
    status public."TicketStatus" DEFAULT 'AVAILABLE'::public."TicketStatus" NOT NULL,
    "bookingId" text,
    "eventDetailId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Ticket";
       public         heap r       postgres    false            �            1259    40735 
   TicketType    TABLE     ^  CREATE TABLE public."TicketType" (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    price double precision NOT NULL,
    "availableSeats" integer NOT NULL,
    "eventId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
     DROP TABLE public."TicketType";
       public         heap r       postgres    false            �            1259    40741    User    TABLE     U  CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."User";
       public         heap r       postgres    false            �            1259    40748    Venue    TABLE     2  CREATE TABLE public."Venue" (
    id text NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    capacity integer NOT NULL,
    "regionId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public."Venue";
       public         heap r       postgres    false            �            1259    40754    _EventToFighter    TABLE     X   CREATE TABLE public."_EventToFighter" (
    "A" text NOT NULL,
    "B" text NOT NULL
);
 %   DROP TABLE public."_EventToFighter";
       public         heap r       postgres    false            J          0    40687    Booking 
   TABLE DATA           v   COPY public."Booking" (id, "userId", "eventId", "totalAmount", "paymentStatus", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    217   �O       K          0    40694    Event 
   TABLE DATA           �   COPY public."Event" (id, title, description, date, "startTime", "endTime", "imageUrl", "usesDefaultPoster", "venueId", "regionId", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    218   �O       L          0    40701    EventDetail 
   TABLE DATA           �   COPY public."EventDetail" (id, "eventId", "seatType", price, capacity, description, "soldCount", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    219   dQ       M          0    40708    Fight 
   TABLE DATA           �   COPY public."Fight" (id, "eventId", "redFighterId", "blueFighterId", "weightClass", rounds, "order", status, winner, method, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    220   �Q       N          0    40717    Fighter 
   TABLE DATA           }   COPY public."Fighter" (id, name, nickname, "weightClass", record, "imageUrl", country, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    221   R       O          0    40723    Region 
   TABLE DATA           9   COPY public."Region" (id, name, description) FROM stdin;
    public               postgres    false    222   S       P          0    40728    Ticket 
   TABLE DATA           �   COPY public."Ticket" (id, "eventId", "ticketTypeId", status, "bookingId", "eventDetailId", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    223   T       Q          0    40735 
   TicketType 
   TABLE DATA           {   COPY public."TicketType" (id, name, description, price, "availableSeats", "eventId", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    224   0T       R          0    40741    User 
   TABLE DATA           [   COPY public."User" (id, email, password, name, role, "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    225   MT       S          0    40748    Venue 
   TABLE DATA           d   COPY public."Venue" (id, name, address, capacity, "regionId", "createdAt", "updatedAt") FROM stdin;
    public               postgres    false    226   jT       T          0    40754    _EventToFighter 
   TABLE DATA           5   COPY public."_EventToFighter" ("A", "B") FROM stdin;
    public               postgres    false    227   �V       �           2606    40767    Booking Booking_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Booking" DROP CONSTRAINT "Booking_pkey";
       public                 postgres    false    217            �           2606    40769    EventDetail EventDetail_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."EventDetail"
    ADD CONSTRAINT "EventDetail_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."EventDetail" DROP CONSTRAINT "EventDetail_pkey";
       public                 postgres    false    219            �           2606    40771    Event Event_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Event" DROP CONSTRAINT "Event_pkey";
       public                 postgres    false    218            �           2606    40773    Fight Fight_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Fight"
    ADD CONSTRAINT "Fight_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Fight" DROP CONSTRAINT "Fight_pkey";
       public                 postgres    false    220            �           2606    40775    Fighter Fighter_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Fighter"
    ADD CONSTRAINT "Fighter_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Fighter" DROP CONSTRAINT "Fighter_pkey";
       public                 postgres    false    221            �           2606    40777    Region Region_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Region"
    ADD CONSTRAINT "Region_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Region" DROP CONSTRAINT "Region_pkey";
       public                 postgres    false    222            �           2606    40779    TicketType TicketType_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."TicketType"
    ADD CONSTRAINT "TicketType_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."TicketType" DROP CONSTRAINT "TicketType_pkey";
       public                 postgres    false    224            �           2606    40781    Ticket Ticket_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Ticket" DROP CONSTRAINT "Ticket_pkey";
       public                 postgres    false    223            �           2606    40783    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public                 postgres    false    225            �           2606    40785    Venue Venue_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_pkey" PRIMARY KEY (id);
 >   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_pkey";
       public                 postgres    false    226            �           2606    40787 '   _EventToFighter _EventToFighter_AB_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public."_EventToFighter"
    ADD CONSTRAINT "_EventToFighter_AB_pkey" PRIMARY KEY ("A", "B");
 U   ALTER TABLE ONLY public."_EventToFighter" DROP CONSTRAINT "_EventToFighter_AB_pkey";
       public                 postgres    false    227    227            �           1259    40790    User_email_key    INDEX     K   CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);
 $   DROP INDEX public."User_email_key";
       public                 postgres    false    225            �           1259    40791    _EventToFighter_B_index    INDEX     V   CREATE INDEX "_EventToFighter_B_index" ON public."_EventToFighter" USING btree ("B");
 -   DROP INDEX public."_EventToFighter_B_index";
       public                 postgres    false    227            �           2606    40792    Booking Booking_eventId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 J   ALTER TABLE ONLY public."Booking" DROP CONSTRAINT "Booking_eventId_fkey";
       public               postgres    false    217    4756    218            �           2606    40797    Booking Booking_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Booking"
    ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public."Booking" DROP CONSTRAINT "Booking_userId_fkey";
       public               postgres    false    4771    217    225            �           2606    40802 $   EventDetail EventDetail_eventId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."EventDetail"
    ADD CONSTRAINT "EventDetail_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 R   ALTER TABLE ONLY public."EventDetail" DROP CONSTRAINT "EventDetail_eventId_fkey";
       public               postgres    false    218    4756    219            �           2606    40807    Event Event_regionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES public."Region"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public."Event" DROP CONSTRAINT "Event_regionId_fkey";
       public               postgres    false    218    4764    222            �           2606    40812    Event Event_venueId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Event"
    ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES public."Venue"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public."Event" DROP CONSTRAINT "Event_venueId_fkey";
       public               postgres    false    226    218    4773            �           2606    40817    Fight Fight_blueFighterId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Fight"
    ADD CONSTRAINT "Fight_blueFighterId_fkey" FOREIGN KEY ("blueFighterId") REFERENCES public."Fighter"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 L   ALTER TABLE ONLY public."Fight" DROP CONSTRAINT "Fight_blueFighterId_fkey";
       public               postgres    false    4762    220    221            �           2606    40822    Fight Fight_eventId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Fight"
    ADD CONSTRAINT "Fight_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public."Fight" DROP CONSTRAINT "Fight_eventId_fkey";
       public               postgres    false    4756    218    220            �           2606    40827    Fight Fight_redFighterId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Fight"
    ADD CONSTRAINT "Fight_redFighterId_fkey" FOREIGN KEY ("redFighterId") REFERENCES public."Fighter"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 K   ALTER TABLE ONLY public."Fight" DROP CONSTRAINT "Fight_redFighterId_fkey";
       public               postgres    false    220    221    4762            �           2606    40832 "   TicketType TicketType_eventId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."TicketType"
    ADD CONSTRAINT "TicketType_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 P   ALTER TABLE ONLY public."TicketType" DROP CONSTRAINT "TicketType_eventId_fkey";
       public               postgres    false    4756    224    218            �           2606    40837    Ticket Ticket_bookingId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES public."Booking"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 J   ALTER TABLE ONLY public."Ticket" DROP CONSTRAINT "Ticket_bookingId_fkey";
       public               postgres    false    217    4754    223            �           2606    40842     Ticket Ticket_eventDetailId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_eventDetailId_fkey" FOREIGN KEY ("eventDetailId") REFERENCES public."EventDetail"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 N   ALTER TABLE ONLY public."Ticket" DROP CONSTRAINT "Ticket_eventDetailId_fkey";
       public               postgres    false    223    4758    219            �           2606    40847    Ticket Ticket_eventId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 H   ALTER TABLE ONLY public."Ticket" DROP CONSTRAINT "Ticket_eventId_fkey";
       public               postgres    false    223    4756    218            �           2606    40852    Ticket Ticket_ticketTypeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Ticket"
    ADD CONSTRAINT "Ticket_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES public."TicketType"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."Ticket" DROP CONSTRAINT "Ticket_ticketTypeId_fkey";
       public               postgres    false    223    224    4768            �           2606    40857    Venue Venue_regionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Venue"
    ADD CONSTRAINT "Venue_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES public."Region"(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public."Venue" DROP CONSTRAINT "Venue_regionId_fkey";
       public               postgres    false    222    226    4764            �           2606    40862 &   _EventToFighter _EventToFighter_A_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_EventToFighter"
    ADD CONSTRAINT "_EventToFighter_A_fkey" FOREIGN KEY ("A") REFERENCES public."Event"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."_EventToFighter" DROP CONSTRAINT "_EventToFighter_A_fkey";
       public               postgres    false    4756    227    218            �           2606    40867 &   _EventToFighter _EventToFighter_B_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."_EventToFighter"
    ADD CONSTRAINT "_EventToFighter_B_fkey" FOREIGN KEY ("B") REFERENCES public."Fighter"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 T   ALTER TABLE ONLY public."_EventToFighter" DROP CONSTRAINT "_EventToFighter_B_fkey";
       public               postgres    false    221    4762    227            J      x������ � �      K   �  x�u��n�0E��W�F�×v)P��(�] ���r�J�$�����"M���3��{'���
B �9����v����?ͻ_�/��3�%��uȼ����Ֆ�vX���x�j+�Bj����<e��gR�ew�leU�1���Yڜ�Їq�����C��\؎D��
�.񦷊��"dJ o�AB-�SI(��1|?������3C�I�U��0-';ޠ%������RN�����6W�o��l>�7R�ɸ����e�e_ˢ�PR�@B'� *1Oʣg%� ���	t��jpJ���H�M��U-ud[2�o�*ݻ���>9���� S.�(����9�!����������|��GI>a5'�l�Pd�E9��X�je��В46CQ�@u �E(J���Q��l���tJ�$�o�ڦi� e굺      L      x������ � �      M   p   x�K�L�(�500�L-K̓��@b�Ehl#N�<Dr�rr;{������p��������������������������.q�4��FX�6Fb�p��T�m6"�fC�\1z\\\ ��=x      N   �   x����j�0���S�\l�i�{(l��X��"R�1I�9����ю\�H�G���߬���N�]Y�e����4�����W���:����
)
�	�py�drW@�)��V��T+������oa�SMw�����Ε�}�ଛ��@���؛yBN��_9�^m�o;�����󎽑�}3<��+�R,@�>�+8�ߺkt��z_<�.�x���uz�@�c���9=���$�8͌@      O   �   x�EP�n� ��+�u��Y{sO�z�-N	J.D��}9���%���=���l�}^��8��''���O��������Dc!K^m�����_���l��|6����r��ʄ�1��W�q������^j���%o)ǲȒ�;\CL����B'lx'���0ɵb�Uȴ2z�V�z��ٓT\)�۾3V�i��n(�J���C�JX��^q�R���t�2�v�ɶ��4ǙC��)%x;Ve(��{ēt��~�wnY      P      x������ � �      Q      x������ � �      R      x������ � �      S     x����r�0���z ����[�c��N��^� �l#<D���W`�����VB���}6~0��#`Bh��A�7�G� �ڄ�=��N�3=t'��V�t��<��u-��pA��΂[����SB	I���4��O[2�&�Ud��ٚ�E�>O�硽8o̴ėy�6�/�Ws�[�C��'?<�O�g/to��[�1�p�aE��g���7��)|��t1e=@�2�\���=;ġN& ͩ 	e��e�7�����ӝ�%�L�{7��l,<���(n�v1���ۖ���j�ϒ���~���$Ѷ�|;��|p�I�B����u�k;�ķ	2�������wC�/���2�%W���kFD�AH���.M�g<�y��!z��#�D��Ա���-���J`�`%�*3CsU�6ׅP��k-�OK���9.k�pF��y�5V\*QI*xl�I�iN�=��ٞ��h]�s"��J�D��T�\�8��	�A���������6*h^p�l���i���5+      T   ,   x�K-K�+�500�L�L�(I-��R��a5�*j����� ;�     