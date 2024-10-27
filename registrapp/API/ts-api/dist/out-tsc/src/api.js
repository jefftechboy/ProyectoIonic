"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var firebase_admin_1 = require("firebase-admin");
// Inicializa la app de Firebase
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault(),
    databaseURL: 'https://<tu-proyecto>.firebaseio.com' // Cambia <tu-proyecto> por el ID de tu proyecto
});
var db = firebase_admin_1.default.firestore();
var app = (0, express_1.default)();
var port = 3000;
app.use(body_parser_1.default.json());
// Registrar Usuario
app.post('/api/usuarios/register', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, correo, nombre, tipo, sede, telefono, nuevoUsuario, usuarioRef, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password, correo = _a.correo, nombre = _a.nombre, tipo = _a.tipo, sede = _a.sede, telefono = _a.telefono;
                // Validar campos
                if (!username || !password || !correo || !nombre || !tipo) {
                    return [2 /*return*/, res.status(400).send('Todos los campos son obligatorios.')];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                nuevoUsuario = {
                    username: username,
                    password: password,
                    correo: correo,
                    nombre: nombre,
                    tipo: tipo,
                    sede: sede,
                    telefono: telefono,
                };
                return [4 /*yield*/, db.collection('usuarios').add(nuevoUsuario)];
            case 2:
                usuarioRef = _b.sent();
                return [2 /*return*/, res.status(201).json(__assign({ id: usuarioRef.id }, nuevoUsuario))]; // Asegúrate de retornar la respuesta
            case 3:
                error_1 = _b.sent();
                console.error("Error agregando usuario: ", error_1);
                return [2 /*return*/, res.status(500).send('Error al registrar el usuario.')]; // Asegúrate de retornar la respuesta
            case 4: return [2 /*return*/];
        }
    });
}); });
// Obtener Todos los Usuarios
app.get('/api/usuarios', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var snapshot, usuarios_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.collection('usuarios').get()];
            case 1:
                snapshot = _a.sent();
                usuarios_1 = [];
                snapshot.forEach(function (doc) {
                    usuarios_1.push(__assign({ id: doc.id }, doc.data()));
                });
                return [2 /*return*/, res.json(usuarios_1)]; // Asegúrate de retornar la respuesta
            case 2:
                error_2 = _a.sent();
                console.error("Error obteniendo usuarios: ", error_2);
                return [2 /*return*/, res.status(500).send('Error al obtener usuarios.')]; // Asegúrate de retornar la respuesta
            case 3: return [2 /*return*/];
        }
    });
}); });
// Iniciar el servidor
app.listen(port, function () {
    console.log("Servidor corriendo en http://localhost:".concat(port));
});
