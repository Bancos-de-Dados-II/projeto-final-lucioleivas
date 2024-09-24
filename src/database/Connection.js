import { Sequelize } from "sequelize";


class Connection {

    constructor () {
        if (!Connection.instance) {
            // Configura e cria a instância do Sequelize
            this.sequelize = new Sequelize('database', 'docker', 'docker', {
                host: 'localhost',
                dialect: 'postgres',
                logging: console.log
            });
            // Salva a instância
            Connection.instance = this;
        }
        return Connection.instance;
    }

    getInstance() {
        return this.sequelize;
    }


}

// Exporta uma instância da classe Database
const instance = new Connection();
Object.freeze(instance); // Congela a instância para evitar modificações


export default instance.getInstance();