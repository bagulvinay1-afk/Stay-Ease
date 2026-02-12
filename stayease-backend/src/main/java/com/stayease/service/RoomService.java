package com.stayease.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.stayease.dto.RoomRequestDto;
import com.stayease.entity.Pg;
import com.stayease.entity.Room;
import com.stayease.repository.PgRepository;
import com.stayease.repository.RoomRepository;

import jakarta.transaction.Transactional;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepo;

    @Autowired
    private PgRepository pgRepo;

    @Transactional
   
    public Room addRoom(Long pgId, Room room) {

        Pg pg = pgRepo.findById(pgId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "PG not found"));

        // ✅ CORRECT CHECK
        boolean exists = roomRepo.existsByRoomNumberAndPg_Id(
                room.getRoomNumber(), pgId);

        if (exists) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Room number already exists in this PG");
        }

        room.setPg(pg);
        return roomRepo.save(room);
    }


    @Transactional
    public void deleteRoom(Long id) {


    Room room = roomRepo.findById(id)
    .orElseThrow(() -> new RuntimeException("Room not found"));


    // IMPORTANT: break relation from JPA side
    room.setPg(null);


    roomRepo.delete(room);
    }
    
    public Room getRoomById(Long id) {
        return roomRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
    }
    public List<Room> getRoomsByPg(Long pgId) {
        return roomRepo.findByPgId(pgId);
    }

    public List<Room> getRoomsBySharing(Long pgId, int sharing) {
        return roomRepo.findByPgIdAndSharing(pgId, sharing);
    }

//    @Transactional
//    public Room updateRoom(Long id, Room updatedRoom) {
//
//        Room existing = roomRepo.findById(id)
//                .orElseThrow(() -> new RuntimeException("Room not found"));
//
//        existing.setRoomNo(updatedRoom.getRoomNo());
//        existing.setSharing(updatedRoom.getSharing());
//        existing.setRentPerBed(updatedRoom.getRentPerBed());
//        existing.setTotalBeds(updatedRoom.getTotalBeds());
//        existing.setAvailableBeds(updatedRoom.getAvailableBeds());
//
//        return roomRepo.save(existing);
//    }
    
    public Room updateRoom(Long roomId, RoomRequestDto request) {

        Room room = roomRepo.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        Long pgId = room.getPg().getId();

        // 🔒 Duplicate room number check
        boolean exists = roomRepo.existsByRoomNumberAndPg_IdAndIdNot(
                request.getRoomNumber(),
                pgId,
                roomId
        );

        if (exists) {
            throw new RuntimeException("Room number already exists in this PG");
        }

        //  Update fields
        room.setRoomNumber(request.getRoomNumber());
        room.setSharing(request.getSharing());
        room.setRent(request.getRent());
        room.setTotalBeds(request.getTotalBeds());
        room.setAvailableBeds(request.getAvailableBeds());

        return roomRepo.save(room);
    }

}
