CREATE DATABASE carvajal;

CREATE TABLE usuario(
    id serial,
    nombre varchar(250),
    correo varchar(250),
    pass varchar(250),
    telefono varchar(15),
    username varchar(250),
    primary key (id)
);

CREATE TABLE productos(
    id serial,
    nombre varchar(250),
    precio int,
    cantidad_stack int,
    descripcion varchar(250),
    categoria varchar(100),
    primary key (id)
);

CREATE TABLE wish_list(
    id serial,
    id_user int,
    total_productos int,
    pago_total int,
    estado varchar(50),
    primary key (id),
    foreign key (id_user) references usuario (id)
);

CREATE TABLE list_product_fact(
    id serial,
    id_wish_list int,
    id_producto int,
    cantidad_producto int,
    fecha_agregada date,
    primary key id,
    foreign key (id_wish_list) references wish_list (id),
    foreign key (id_producto) references productos (id) 
);