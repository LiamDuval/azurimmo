package bts.sio.azurimmo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import bts.sio.azurimmo.model.Gerant;
import bts.sio.azurimmo.model.dto.GerantDTO;
import bts.sio.azurimmo.model.mapper.GerantMapper;
import bts.sio.azurimmo.repository.GerantRepository;

@Service
public class GerantService {

    @Autowired
    private GerantRepository gerantRepository;


    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public GerantService(GerantRepository gerantRepository) {
        this.gerantRepository = gerantRepository;
    }


    public GerantDTO saveGerantDTO(GerantDTO dto) {
        Gerant entity = GerantMapper.toEntity(dto);

        if (entity.getPassword() != null && !entity.getPassword().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(entity.getPassword());
            entity.setPassword(hashedPassword);
        }

        Gerant saved = gerantRepository.save(entity);
        return GerantMapper.toDTO(saved);
    }


    public Optional<GerantDTO> login(String mail, String passwordSaisi) {
        Optional<Gerant> gerantOpt = gerantRepository.findByMail(mail);

        if (gerantOpt.isEmpty()) {
            return Optional.empty();
        }

        Gerant gerant = gerantOpt.get();

        boolean passwordCorrect = passwordEncoder.matches(passwordSaisi, gerant.getPassword());

        if (!passwordCorrect) {
            return Optional.empty();
        }

        return Optional.of(GerantMapper.toDTO(gerant));
    }

    public Optional<GerantDTO> getGerantDTO(Long id) {
        return gerantRepository.findById(id).map(GerantMapper::toDTO);
    }

    public List<Gerant> findAll() {
        return gerantRepository.findAll();
    }
}