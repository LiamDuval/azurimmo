package bts.sio.azurimmo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bts.sio.azurimmo.model.Gerant;
import bts.sio.azurimmo.model.dto.GerantDTO;
import bts.sio.azurimmo.model.mapper.GerantMapper;
import bts.sio.azurimmo.repository.GerantRepository;

@Service
public class GerantService {
	
	@Autowired 
	private GerantRepository gerantRepository;
	
	public GerantService (GerantRepository gerantRepository) {
		this.gerantRepository = gerantRepository;
		
	}
	
	public Gerant saveGerant(Gerant gerant) {
		Gerant savedGerant = gerantRepository.save(gerant);
		return savedGerant; 
	}
	
	public Optional<GerantDTO> getGerantDTO(Long id) {
		return gerantRepository.findById(id)
				 .map(GerantMapper::toDTO);
				 }
	
	public List<Gerant> findAll() {
		return gerantRepository.findAll();
	}
	
	public GerantDTO saveGerantDTO(GerantDTO dto) {
		Gerant entity = GerantMapper.toEntity(dto);
		Gerant saved = gerantRepository.save(entity);
		 return GerantMapper.toDTO(saved);
		 }

}

