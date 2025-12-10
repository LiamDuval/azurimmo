package bts.sio.azurimmo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bts.sio.azurimmo.model.dto.BatimentDTO;
import bts.sio.azurimmo.model.mapper.BatimentMapper;
import bts.sio.azurimmo.repository.BatimentRepository;
import lombok.Data;

@Data
@Service

public class BatimentService {
	
	@Autowired 
	private BatimentRepository batimentRepository;
	
	public BatimentService (BatimentRepository batimentRepository) {
		this.batimentRepository = batimentRepository;
		
	}
	
	public Optional<BatimentDTO> getBatimentDTO(Long id) {
		return batimentRepository.findById(id)
				 .map(BatimentMapper::toDTO);
				 }

}
