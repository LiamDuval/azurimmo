package bts.sio.azurimmo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bts.sio.azurimmo.model.Contrat;
import bts.sio.azurimmo.model.dto.ContratDTO;
import bts.sio.azurimmo.model.mapper.ContratMapper;
import bts.sio.azurimmo.repository.ContratRepository;




@Service
public class ContratService {
	@Autowired 
	private ContratRepository contratRepository;
	
	public ContratService (ContratRepository contratRepository) {
		this.contratRepository = contratRepository;
		
	}
	
	public Optional<ContratDTO> getContratDTO(Long id) {
		return contratRepository.findById(id)
				 .map(ContratMapper::toDTO);
				 }
	
	public ContratDTO saveContratDTO(ContratDTO dto) {
		Contrat entity = ContratMapper.toEntity(dto);
		Contrat saved = contratRepository.save(entity);
		 return ContratMapper.toDTO(saved);
		 }
}
