package bts.sio.azurimmo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bts.sio.azurimmo.model.Intervention;
import bts.sio.azurimmo.model.dto.InterventionDTO;
import bts.sio.azurimmo.model.mapper.InterventionMapper;
import bts.sio.azurimmo.repository.InterventionRepository;

@Service
public class InterventionService {
	@Autowired 
	private InterventionRepository interventionRepository;
	
	public InterventionService (InterventionRepository interventionRepository) {
		this.interventionRepository = interventionRepository;
		
	}
	
	public Optional<InterventionDTO> getInterventionDTO(Long id) {
		return interventionRepository.findById(id)
				 .map(InterventionMapper::toDTO);
				 }
	
	public InterventionDTO saveInterventionDTO(InterventionDTO dto) {
		Intervention entity = InterventionMapper.toEntity(dto);
		Intervention saved = interventionRepository.save(entity);
		 return InterventionMapper.toDTO(saved);
		 }
}
