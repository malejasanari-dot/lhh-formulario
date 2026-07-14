/**
 * Controlador de candidatos
 * 
 * Recibe el formulario completo del frontend.
 * Por ahora NO guarda en MySQL.
 * Solo valida y muestra datos en consola.
 */

const db = require('../db/connection');
// TODO: TEMPORAL PARA DESARROLLO - ELIMINAR CUANDO EL LOGIN ESTÉ INTEGRADO
const { generateDevUserCredentials } = require('../utils/developmentUser');

const createCandidato = async (req, res) => {
    try {

        const data = req.body;

        // Validación básica
        if (!data.nombre) {
            return res.status(400).json({
                status: 'error',
                message: 'Faltan datos personales (nombre)'
            });
        }

        console.log('=================================');
        console.log('📩 FORMULARIO RECIBIDO');
        console.log(JSON.stringify(data, null, 2));
        console.log('=================================');

        // Mapeo de campos de texto del formulario a la tabla users
        const firstName = data.nombre || null;
        const lastName = data.apellido || null;
        const idNumber = data.numero_documento || null;
        const address = data.direccion || null;
        const mobile = data.movil || null;
        const phone = data.telefono_fijo || null;
        const idTypeId = data.tipo_documento || null;
        const officeId = data.ciudad_programa || null;
        const birthday = data.fecha_nacimiento || null;
        const cityId = data.ciudad || null;
        const gender = data.genero || null;

        // TODO: TEMPORAL PARA DESARROLLO - ELIMINAR CUANDO EL LOGIN ESTÉ INTEGRADO
        const { email, password } = generateDevUserCredentials();

        console.log({
          firstName,
          lastName,
          idNumber,
          address,
          mobile,
          phone,
          idTypeId,
          officeId,
          birthday,
          cityId,
          gender
        });

        // Insertar en la tabla users
        const [result] = await db.query(
            `INSERT INTO users (first_name, last_name, id_number, address, mobile, phone, email, password, id_type_id, office_id, birthday, city_id, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [firstName, lastName, idNumber, address, mobile, phone, email, password, idTypeId, officeId, birthday, cityId, gender]
        );

        console.log('InsertId:', result.insertId);
        console.log('AffectedRows:', result.affectedRows);

        const userId = result.insertId;

        if (data.linkedin && data.linkedin.trim() !== '') {
            const linkedinUrl = data.linkedin.trim();
            await db.query(
                `INSERT INTO linkedin (user_id, url) VALUES (?, ?)`,
                [userId, linkedinUrl]
            );
            console.log('✅ Perfil de LinkedIn guardado:', {
                userId,
                url: linkedinUrl
            });
        }

        const maritalStatusId = data.estado_civil || null;
        const regionId = data.ciudad_programa || null;
        const educationLevelId = data.nivel_educativo || null;

        console.log({
            userId,
            maritalStatusId,
            regionId,
            educationLevelId
        });

        await db.query(
            `INSERT INTO candidates (user_id, marital_status_id, region_id, education_level_id) VALUES (?, ?, ?, ?)`,
            [userId, maritalStatusId, regionId, educationLevelId]
        );

        if (data.profesiones && Array.isArray(data.profesiones) && data.profesiones.length > 0) {
            for (const prof of data.profesiones) {
                const professionId = Number(prof);
                if (!isNaN(professionId) && professionId > 0) {
                    await db.query(
                        `INSERT INTO profession_user (user_id, profession_id) VALUES (?, ?)`,
                        [userId, professionId]
                    );
                    console.log({
                        userId,
                        professionId
                    });
                }
            }
        }

        // =========================================
        // IDIOMAS
        // =========================================
        let insertCountIdiomas = 0;

        if (data.idioma_nativo) {
            const nativeLanguageId = Number(data.idioma_nativo);

            if (!isNaN(nativeLanguageId) && nativeLanguageId > 0) {
                await db.query(
                    `INSERT INTO language_user (user_id, language_id, language_level_id, native) VALUES (?, ?, ?, ?)`,
                    [userId, nativeLanguageId, null, 1]
                );
                
                insertCountIdiomas++;
                
                console.log({
                    userId,
                    languageId: nativeLanguageId,
                    languageLevelId: null,
                    native: 1
                });
            }
        }

        if (data.idiomas && Array.isArray(data.idiomas) && data.idiomas.length > 0) {
            for (const lang of data.idiomas) {
                const languageId = Number(lang.language);
                const languageLevelId = Number(lang.level);
                
                if (!isNaN(languageId) && !isNaN(languageLevelId) && languageId > 0 && languageLevelId > 0) {
                    await db.query(
                        `INSERT INTO language_user (user_id, language_id, language_level_id, native) VALUES (?, ?, ?, ?)`,
                        [userId, languageId, languageLevelId, 0]
                    );
                    
                    insertCountIdiomas++;
                    
                    console.log({
                        userId,
                        languageId,
                        languageLevelId,
                        native: 0
                    });
                }
            }
        }

        // =========================================
        // TECNOLOGÍAS
        // =========================================
        let insertCountTecnologias = 0;

        if (data.tecnologias && Array.isArray(data.tecnologias) && data.tecnologias.length > 0) {
            for (const tech of data.tecnologias) {
                const technologyId = Number(tech);
                
                if (!isNaN(technologyId) && technologyId > 0) {
                    await db.query(
                        `INSERT INTO technology_user (user_id, technology_id) VALUES (?, ?)`,
                        [userId, technologyId]
                    );
                    
                    insertCountTecnologias++;
                    
                    console.log({
                        userId,
                        technologyId
                    });
                }
            }
        }

        // =========================================
        // HISTORIA LABORAL (JOBS)
        // =========================================
        let insertCountJobs = 0;

        if (data.historia_laboral && Array.isArray(data.historia_laboral) && data.historia_laboral.length > 0) {
            for (const experiencia of data.historia_laboral) {
                let companyId = null;
                let companyName = '';
                let economicSectorId = null;

                if (experiencia.empresa) {
                    if (typeof experiencia.empresa === 'object' && experiencia.empresa !== null) {
                        const newCompanyName = (experiencia.empresa.empresa || '').trim();
                        economicSectorId = experiencia.empresa.sector || null;

                        const [insertCompanyResult] = await db.query(
                            `INSERT INTO companies (name, economic_sector_id) VALUES (?, ?)`,
                            [newCompanyName, economicSectorId]
                        );

                        companyId = insertCompanyResult.insertId;
                        companyName = newCompanyName;

                        console.log({
                            companyId,
                            companyName,
                            economicSectorId,
                            created: true
                        });
                    } else {
                        const parsedCompanyId = Number(experiencia.empresa);
                        
                        if (!isNaN(parsedCompanyId) && parsedCompanyId > 0) {
                            companyId = parsedCompanyId;
                            
                            const [companyRows] = await db.query(
                                `SELECT name, economic_sector_id FROM companies WHERE id = ?`,
                                [companyId]
                            );
                            if (companyRows && companyRows.length > 0) {
                                companyName = companyRows[0].name || '';
                                economicSectorId = companyRows[0].economic_sector_id || null;
                            } else {
                                companyName = '';
                            }
                            
                            console.log({
                                companyId,
                                companyName,
                                economicSectorId,
                                existing: true
                            });
                        } else if (typeof experiencia.empresa === 'string' && experiencia.empresa.trim() !== '') {
                            const newCompanyName = experiencia.empresa.trim();
                            
                            const [insertCompanyResult] = await db.query(
                                `INSERT INTO companies (name) VALUES (?)`,
                                [newCompanyName]
                            );
                            
                            companyId = insertCompanyResult.insertId;
                            companyName = newCompanyName;
                            
                            console.log({
                                companyId,
                                companyName,
                                created: true
                            });
                        }
                    }
                }

                const levelId = experiencia.nivelLaboral || null;
                const title = experiencia.cargo || null;
                const role = experiencia.funcionPrincipal || null;
                
                let seniority = null;
                if (experiencia.antiguedad) {
                    if (experiencia.antiguedad === 'Menos de 1 año') {
                        seniority = 0.5;
                    } else {
                        const match = experiencia.antiguedad.match(/\d+/);
                        if (match) {
                            seniority = Number(match[0]);
                        }
                    }
                }
                
                let salary = null;
                if (experiencia.ultimoSalario) {
                    salary = Number(String(experiencia.ultimoSalario).replace(/\./g, ''));
                }
                
                const date = experiencia.fechaRetiro || null;
                const reasonId = experiencia.motivoRetiro || null;
                const interestingAreaId = experiencia.areasExpertiz || null;
                const type = 'leave';
                
                let additionalPackageItems = null;
                if (experiencia.paqueteDesvinculacion && Array.isArray(experiencia.paqueteDesvinculacion) && experiencia.paqueteDesvinculacion.length > 0) {
                    const transformedPackage = experiencia.paqueteDesvinculacion.map(item => ({
                        id: item.id,
                        quantity: item.quantity
                    }));
                    additionalPackageItems = JSON.stringify(transformedPackage);
                }
                
                await db.query(
                    `INSERT INTO jobs (user_id, company_id, company_name, economic_sector_id, level_id, title, role, seniority, salary, date, reason_id, interesting_area_id, type, additional_package_items) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [userId, companyId, companyName, economicSectorId, levelId, title, role, seniority, salary, date, reasonId, interestingAreaId, type, additionalPackageItems]
                );
                
                insertCountJobs++;
                
                console.log({
                    userId,
                    companyId,
                    companyName,
                    economicSectorId,
                    levelId,
                    title,
                    role,
                    seniority,
                    salary,
                    date,
                    reasonId,
                    interestingAreaId,
                    type,
                    additionalPackageItems
                });
            }
        }

        // =========================================
        // PERFIL DEL CANDIDATO (PROFILES)
        // =========================================
        {
            const salarialRangeId = (data.historia_laboral && data.historia_laboral.length > 0)
                ? (data.historia_laboral[0].salarial_range_id || null)
                : null;

            await db.query(
                `INSERT INTO profiles (id, description, salarial_range_id, relocation) VALUES (?, ?, ?, ?)`,
                [userId, 'Entrada Formulario', salarialRangeId, data.disponibilidad_movilidad]
            );
            
            const profileId = userId;

            console.log({
                profileId: userId,
                description: 'Entrada Formulario',
                salarialRangeId,
                relocation: data.disponibilidad_movilidad
            });

            await db.query(
                `INSERT INTO profile_user (profile_id, user_id) VALUES (?, ?)`,
                [profileId, userId]
            );

            console.log({
                profileId: userId,
                userId
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Formulario recibido correctamente y usuario creado',
            data: {
                userId: result.insertId
            }
        });

    } catch (error) {

        console.error('Error en createCandidato:', error);

        res.status(500).json({
            status: 'error',
            message: 'Error procesando formulario'
        });

    }
};

module.exports = {
    createCandidato
};